const reqlib = require('app-root-path').require
const { List } = require('immutable')

const Constants = reqlib('config/constants')
const fs = reqlib('config/filestorage')
const Models = reqlib('models/')
const NotificationTypes = reqlib('config/notification-types')
const slack = reqlib('slack')

const { validator } = Models.Dynamite
const { PostTypePoll, PostTypeText } = Constants

const {
  createCommentId,
  createNotificationId,
  createPollAnswerId,
  createPostId,
  createPostImageId,
  createUserVoteItemId,
} = Constants.Helpers

const { PostFlagTypes, VoteDirections } = Constants.AllowedValues
const { postText, postTitle } = Constants.EntityLimits

// const shouldAddImage = attrs => {
//   const {
//     height,
//     width,
//   } = attrs;

//   const h = Number.parseInt(height, 10);
//   const w = Number.parseInt(width, 10);

//   if (!Number.isNaN(h) || !Number.isNaN(w)) {
//     // Skip tracking pixels.
//     if (h <= 1 || w <= 1) {
//       return false;
//     }
//   }

//   return true;
// };

// const searchImages = node => {
//   const {
//     children,
//     name,
//     type,
//   } = node;

//   let resultsArr = [];
//   let { attribs } = node;

//   attribs = attribs || {};

//   if (type === 'tag') {
//     const {
//       itemprop,
//       name: aName,
//       property,
//     } = attribs;

//     if (name === 'meta') {
//       const metaTagsArr = [
//         'twitter:image',
//         'og:image',
//       ];

//       if (itemprop === 'image' && shouldAddImage(attribs)) {
//         resultsArr = [
//           ...resultsArr,
//           {
//             src: attribs.content,
//             weight: 1,
//           },
//         ];
//       }

//       if ((metaTagsArr.includes(property) ||
//         metaTagsArr.includes(aName)) && shouldAddImage(attribs)) {
//         resultsArr = [
//           ...resultsArr,
//           {
//             src: attribs.content,
//             weight: 3,
//           },
//         ];
//       }
//     }

//     if (name === 'img' && shouldAddImage(attribs)) {
//       resultsArr = [
//         ...resultsArr,
//         {
//           src: attribs.src,
//           weight: 2,
//         },
//       ];
//     }
//   }

//   if (children) {
//     for (let i = 0; i < children.length; i += 1) {
//       resultsArr = [
//         ...resultsArr,
//         ...searchImages(children[i]),
//       ];
//     }
//   }

//   return resultsArr;
// };

module.exports.delete = (req, res, next) => {
  const { postid } = req.params;
  const username = req.user.get('username');
  let branchesToUpdate = [];
  let postComments = null;
  let postGlobalPoints = null;

  if (!postid) {
    req.error = {
      message: 'Missing postid.',
      status: 400,
    };
    return next(JSON.stringify(req.error));
  }

  return Models.PostData.findById(postid)
    .then(instance => {
      if (instance === null) {
        return Promise.reject({
          message: 'Post does not exist.',
          status: 404,
        });
      }

      if (instance.get('creator') !== username) {
        return Promise.reject({
          message: 'You can delete only your own posts.',
          status: 403,
        });
      }

      // Delete all post entries on all branches where it was included.
      // NB: Do not remove post data and post images for now - may want to reinstate posts.
      return Models.Post.findById(postid);
    })
    .then(posts => {
      let promises = [];

      for (let i = 0; i < posts.length; i += 1) {
        const post = posts[i];
        const branchid = post.get('branchid');

        branchesToUpdate = [
          ...branchesToUpdate,
          branchid,
        ];

        if (postComments === null) postComments = post.get('comment_count');
        if (postGlobalPoints === null) postGlobalPoints = post.get('global');

        const promise = post.destroy();
        promises = [
          ...promises,
          promise,
        ];
      }

      return Promise.all(promises);
    })
    // Delete all flagged post instances.
    .then(() => Models.FlaggedPost.findById(postid))
    .then(posts => {
      let promises = [];

      for (let i = 0; i < posts.length; i += 1) {
        const promise = posts[i].destroy();
        promises = [
          ...promises,
          promise,
        ];
      }

      return Promise.all(promises);
    })
    // Update branch stats.
    .then(() => {
      let promises = [];

      for (let i = 0; i < branchesToUpdate.length; i += 1) {
        const promise = Models.Branch.findById(branchesToUpdate[i]);
        promises = [
          ...promises,
          promise,
        ];
      }

      return Promise.all(promises);
    })
    .then(branches => {
      let promises = [];

      for (let i = 0; i < branches.length; i += 1) {
        const branch = branches[i];
        branch.set('post_count', branch.get('post_count') - 1);
        branch.set('post_comments', branch.get('post_comments') - postComments);
        branch.set('post_points', branch.get('post_points') - postGlobalPoints);

        const promise = branch.update();
        // todo
        // .then(() => algolia.updateObjects(branch.dataValues, 'branch'))

        promises = [
          ...promises,
          promise,
        ];
      }

      return Promise.all(promises);
    })
    .then(() => next())
    .catch(err => {
      console.error('Error deleting post: ', err);
      req.error = {
        message: err,
      };
      return next(JSON.stringify(req.error));
    });
};

module.exports.deleteComment = (req, res, next) => {
  const {
    commentid,
    postid,
  } = req.params;
  const username = req.user.get('username');
  let comment;

  if (!commentid) {
    req.error = {
      message: 'Invalid commentid.',
      status: 400,
    };
    return next(JSON.stringify(req.error));
  }

  if (!postid) {
    req.error = {
      message: 'Invalid postid.',
      status: 400,
    };
    return next(JSON.stringify(req.error));
  }

  return module.exports.getOneComment(commentid, req)
    .then(instance => {
      if (instance === null) {
        return Promise.reject({
          message: 'Comment does not exist.',
          status: 404,
        });
      }

      comment = instance;

      if (comment.get('data').creator !== username) {
        return Promise.reject({
          message: 'You can delete only your own comments.',
          status: 403,
        });
      }

      if (!comment.get('replies')) {
        return Models.CommentData.destroy({ id: comment.get('id') });
      }

      // Removing the comment would cut off the replies, we don't want that.
      return Models.CommentData.update({
        where: {
          id: comment.get('id'),
        },
      }, {
        deleted: true,
      });
    })
    // Update counters.
    // Decrease total user comments.
    .then(() => {
      req.user.set('num_comments', req.user.get('num_comments') - 1);
      return req.user.update();
    })
    // Find all post entries where the comment appears and decrease their comment count.
    .then(() => Models.Post.findById(postid))
    .then(posts => {
      let promises = [];

      for (let i = 0; i < posts.length; i += 1) {
        const post = posts[i];
        post.set('comment_count', post.get('comment_count') - 1);
        const promise = post.update();

        promises = [
          ...promises,
          promise,
        ];
      }

      return Promise.all(promises);
    })
    .then(() => {
      if (comment.get('parentid') === 'none') {
        return Promise.resolve();
      }

      return Models.Comment.findById(comment.get('parentid'));
    })
    // Decrease the parent comment replies counter if a parent comment exists.
    .then(instance => {
      if (!instance) {
        return Promise.resolve();
      }

      instance.set('replies', instance.get('replies') - 1);
      return instance.update();
    })
    .then(() => {
      if (!comment.get('replies')) {
        return comment.destroy();
      }
      return Promise.resolve();
    })
    // Find all post entries to get the list of branches it is tagged to.
    .then(() => Models.Post.findById(postid))
    // Decrease post comments totals for each branch.
    .then(posts => {
      let promises = [];

      for (let i = 0; i < posts.length; i += 1) {
        const promise = Models.Branch.findById(posts[i].get('branchid'))
          .then(instance => {
            if (instance === null) {
              return Promise.reject({
                message: 'Branch does not exist.',
                status: 404,
              });
            }

            instance.set('post_comments', instance.get('post_comments') - 1);
            return instance.update();
          })
          .catch(err => Promise.reject(err));

        promises = [
          ...promises,
          promise,
        ];
      }

      return Promise.all(promises);
    })
    .then(() => next())
    .catch(err => {
      if (typeof err === 'object' && err.status) {
        req.error = err;
        return next(JSON.stringify(req.error));
      }

      req.error = {
        message: err,
      };
      return next(JSON.stringify(req.error));
    });
};

module.exports.editComment = (req, res, next) => {
  const {
    commentid,
    postid,
  } = req.params;
  const username = req.user.get('username');
  const { text } = req.body;
  // const comment = new Comment();
  // const commentData = new CommentData();

  if (!postid) {
    req.error = {
      message: 'Invalid postid.',
      status: 400,
    };
    return next(JSON.stringify(req.error));
  }

  if (!commentid) {
    req.error = {
      message: 'Invalid commentid.',
      status: 400,
    };
    return next(JSON.stringify(req.error));
  }

  if (!text) {
    req.error = {
      message: 'Invalid text.',
      status: 400,
    };
    return next(JSON.stringify(req.error));
  }

  // Check if the comment belongs to this post.
  return Models.Comment.findById(commentid)
    .then(instance => {
      if (instance === null || instance.get('postid') !== postid) {
        return Promise.reject({
          message: 'Comment does not exist.',
          status: 404,
        });
      }

      return Models.CommentData.findById(commentid);
    })
    // Check if user is the author fo the comment.
    // Otherwise, they cannot edit it.
    .then(instance => {
      if (instance === null) {
        return Promise.reject({
          message: 'Comment does not exist.',
          status: 404,
        });
      }

      if (instance.get('creator') !== username) {
        return Promise.reject({
          message: 'You can edit only your own comments.',
          status: 403,
        });
      }

      instance.set('edited', true);
      instance.set('text', text);
      return instance.update();
    })
    .then(() => next())
    .catch(err => {
      console.error('Error editing comment:', err);
      if (typeof err === 'object' && err.status) {
        req.error = err;
        return next(JSON.stringify(req.error));
      }

      req.error = {
        message: err,
      };
      return next(JSON.stringify(req.error));
    });
};

module.exports.flagPost = (req, res, next) => {
  const {
    branchid,
    flag_type,
  } = req.body;
  const { postid } = req.params;
  const date = new Date().getTime();
  const username = req.user.get('username');
  let flag;

  if (!postid) {
    req.error = {
      message: 'Missing postid.',
      status: 400,
    };
    return next(JSON.stringify(req.error));
  }

  if (!PostFlagTypes.includes(flag_type)) {
    req.error = {
      message: 'Invalid flag_type.',
      status: 400,
    };
    return next(JSON.stringify(req.error));
  }

  if (!branchid) {
    req.error = {
      message: 'Missing branchid.',
      status: 400,
    };
    return next(JSON.stringify(req.error));
  }

  // This post might have been flagged already.
  return Models.FlaggedPost.findByPostAndBranchIds(postid, branchid)
    .then(instance => {
      // Oh, seems like no one flagged it yet, we are the first. Let's
      // grab the post data then so we can create a flag.
      if (instance === null) {
        return Models.Post.findByPostAndBranchIds(postid, branchid);
      }

      // Yes, flag exists, update our instance.
      flag = instance;
      return Promise.resolve([]);
    })
    .then(instance => {
      const count = `${flag_type}_count`;

      // We grabbed the post on our way to create the flag, so let's draw
      // the first blood now.
      if (instance) {
        const data = {
          branch_rules_count: 0,
          branchid: instance.get('branchid'),
          date,
          id: instance.get('id'),
          nsfw_count: 0,
          site_rules_count: 0,
          type: instance.get('type'),
          wrong_type_count: 0,
        };
        data[count] = 1;
        return Models.FlaggedPost.create(data);
      }

      // The post has been already flagged, update only the respective key.
      if (flag) {
        flag.set(count, flag.get(count) + 1);
        return flag.update();
      }

      // No flag and no post found? Something is fishy!
      return Promise.reject({
        message: 'The post does not exist.',
        status: 404,
      });
    })
    // Let's gather the branch mods to let them know something is up on their watch.
    .then(() => Models.Mod.findByBranch(branchid))
    .then(mods => {
      let promises = [];

      for (let i = 0; i < mods.length; i += 1) {
        const modUsername = mods[i].get('username');
        const promise = Models.Notification.create({
          data: {
            branchid,
            postid,
            reason: flag_type,
            username,
          },
          date,
          id: createNotificationId(modUsername, date),
          type: NotificationTypes.POST_FLAGGED,
          unread: true,
          user: username,
        });

        promises = [
          ...promises,
          promise,
        ];
      }

      return Promise.all(promises);
    })
    .then(() => next())
    .catch(err => {
      if (err) {
        console.error('Error flagging post:', err);
        return next(JSON.stringify(req.error));
      }

      req.error = {
        status: 404,
      };
      return next(JSON.stringify(req.error));
    });
};

module.exports.get = (req, res, next) => {
  const { postid } = req.params;
  const { branchid } = req.query;

  if (!postid) {
    req.error = {
      message: 'Missing postid.',
      status: 400,
    };
    return next(JSON.stringify(req.error));
  }

  if (!branchid) {
    req.error = {
      message: 'Missing branchid.',
      status: 400,
    };
    return next(JSON.stringify(req.error));
  }

  return Models.Post.findByPostAndBranchIds(postid, branchid)
    .then(instance => {
      if (instance === null) {
        return Promise.reject({
          message: 'Post does not exist.',
          status: 404,
        });
      }

      // Returns richer response, we should probably merge those somehow
      // to save time.
      return module.exports.getOnePost(postid, req);
    })
    .then(instance => {
      res.locals.data = {
        branchid: instance.get('branchid'),
        comment_count: instance.get('comment_count'),
        date: instance.get('date'),
        global: instance.get('global'),
        id: instance.get('id'),
        individual: instance.get('individual'),
        local: instance.get('local'),
        locked: instance.get('locked'),
        nsfw: instance.get('nsfw'),
        type: instance.get('type'),
        up: instance.get('up'),
        creator: instance.get('creator'),
        original_branches: instance.get('original_branches'),
        text: instance.get('text'),
        title: instance.get('title'),
        url: instance.get('url'),
        userVoted: instance.get('userVoted'),
        profileUrl: instance.get('profileUrl'),
        profileUrlThumb: instance.get('profileUrlThumb'),
      };
      return next();
    })
    .catch(err => {
      if (typeof err === 'object' && err.status) {
        req.error = err;
        return next(JSON.stringify(req.error));
      }

      return next(JSON.stringify(req.error));
    });
};

module.exports.getComment = (req, res, next) => {
  const {
    commentid,
    postid,
  } = req.params;
  let comments;
  let parent;

  if (!postid) {
    req.error = {
      message: 'Missing postid.',
      status: 400,
    };
    return next(JSON.stringify(req.error));
  }

  if (!commentid) {
    req.error = {
      message: 'Missing commentid.',
      status: 400,
    };
    return next(JSON.stringify(req.error));
  }

  return module.exports.getOneComment(commentid, req)
    .then(comment => {
      if (comment === null) {
        return Promise.reject({
          message: 'Comment does not exist.',
          status: 404,
        });
      }

      parent = comment;

      return Models.Comment.findByParent(postid, parent.get('id'), 'points', null);
    })
    .then(instances => {
      comments = instances;
      let promises = [];

      comments.forEach(instance => {
        const promise = module.exports.getOneComment(instance.get('id'), req)
          .then(comment => {
            // todo
            Object.keys(comment.dataValues).forEach(key => instance.set(key, comment.get(key)));
            instance.set('comments', []);
            return Promise.resolve();
          })
          .catch(err => Promise.reject(err));

        promises = [
          ...promises,
          promise,
        ];
      });

      return Promise.all(promises);
    })
    .then(() => {
      // todo
      const data = parent.dataValues;
      const arr = comments.map(instance => instance.dataValues);
      data.comments = arr;

      res.locals.data = data;
      return next();
    })
    .catch(err => {
      console.error('Error fetching comments:', err);
      if (typeof err === 'object' && err.status) {
        req.error = err;
        return next(JSON.stringify(req.error));
      }

      return next(JSON.stringify(req.error));
    });
};

module.exports.getComments = (req, res, next) => {
  const {
    lastCommentId,
    // Get root comments by default.
    parentid: parentId = 'none',
    // Order comments by points by default.
    sort: sortBy = 'points',
  } = req.query;
  const { postid: postId } = req.params;
  let comments = [];
  let lastInstance = null;

  if (!postId) {
    req.error = {
      message: 'Missing postid.',
      status: 400,
    };
    return next(JSON.stringify(req.error));
  }

  return new Promise((resolve, reject) => {
    // Client wants only results that appear after this comment (pagination).
    if (lastCommentId) {
      return Models.Comment.findById(lastCommentId)
        .then(instance => {
          if (instance === null) {
            return Promise.reject({
              message: 'Comment does not exist.',
              status: 404,
            });
          }

          lastInstance = instance;
          return resolve();
        })
        .catch(err => reject(err));
    }

    // No last comment specified, continue...
    return resolve();
  })
    .then(() => Models.Comment.findByParent(postId, parentId, sortBy, lastInstance))
    .then(instances => {
      comments = instances;
      let promises = [];

      comments.forEach(instance => {
        const promise = module.exports.getOneComment(instance.get('id'), req)
          .then(comment => {
            // todo
            Object.keys(comment.dataValues).forEach(key => instance.set(key, comment.get(key)));
            return Promise.resolve();
          })
          .catch(err => Promise.reject(err));

        promises = [
          ...promises,
          promise,
        ];
      });

      return Promise.all(promises);
    })
    .then(() => {
      // todo
      const arr = comments.map(instance => instance.dataValues);
      res.locals.data = { comments: arr };
      return next();
    })
    .catch(err => {
      console.error('Error fetching comments:', err);
      if (typeof err === 'object' && err.status) {
        req.error = err;
        return next(JSON.stringify(req.error));
      }

      return next(JSON.stringify(req.error));
    });
};

// todo Check the specfied comment actually belongs to this post.
module.exports.getOneComment = (id, req) => {
  const username = req && req.user ? req.user.get('username') : false;
  let comment;

  return Models.Comment.findById(id)
    .then(instance => {
      if (instance === null) {
        return Promise.reject({
          message: 'Comment does not exist.',
          status: 404,
        });
      }

      comment = instance;
      return Models.CommentData.findById(id);
    })
    .then(instance => {
      if (instance === null) {
        return Promise.reject({
          message: 'Comment does not exist.',
          status: 404,
        });
      }

      // todo
      const data = {};
      Object.keys(instance.dataValues).forEach(key => data[key] = instance.get(key));
      if (data.deleted) {
        delete data.text;
      }
      comment.set('data', data);
      return Promise.resolve();
    })
    // Extend the comment with information about user vote.
    .then(() => {
      if (username) {
        return Models.UserVote.findByUsernameAndItemId(username, `comment-${id}`)
          .then(instance => {
            if (instance !== null) {
              comment.set('userVoted', instance.get('direction'));
            }

            return Promise.resolve();
          })
          .catch(err => Promise.reject(err));
      }

      return Promise.resolve();
    })
    .then(() => Promise.resolve(comment))
    .catch(err => {
      console.error('Error fetching comment data:', err);
      return Promise.reject(err);
    });
};

module.exports.getOnePost = (id, req, branchid) => {
  let post;
  return Models.Post.findById(id)
    .then(instances => {
      if (!instances.length) {
        return Promise.reject({ status: 404 });
      }

      let idx = 0;

      for (let i = 0; i < instances.length; i++) {
        const postBranchId = instances[i].get('branchid');
        // We can request which instance of the post we want.
        // By default, the root instance will be returned.
        if ((branchid && postBranchId === branchid) ||
          (!branchid && postBranchId === 'root')) {
          idx = i;
          break;
        }
      }

      post = instances[idx];
      return Models.PostData.findById(id);
    })
    .then(instance => {
      post.set('creator', instance.get('creator'));
      post.set('id', instance.get('id'));
      post.set('original_branches', instance.get('original_branches'));
      post.set('text', instance.get('text'));
      post.set('title', instance.get('title'));
      post.set('url', instance.get('url'));
      return Promise.resolve();
    })
    // Attach post image url to the post.
    .then(() => {
      const p1 = module.exports.getPostPicture(id, false);
      const p2 = module.exports.getPostPicture(id, true);
      return Promise.all([p1, p2]);
    })
    .then(values => {
      post.set('profileUrl', values[0]);
      post.set('profileUrlThumb', values[1]);
      return Promise.resolve();
    })
    // Extend the posts with information about user vote.
    .then(() => {
      if (req && req.user) {
        const username = req.user.get('username');
        const postId = post.get('id');
        const userVoteItemId = createUserVoteItemId(postId, 'post');
        return Models.UserVote.findByUsernameAndItemId(username, userVoteItemId);
      }

      return Promise.resolve(null);
    })
    .then(instance => {
      if (instance !== null) {
        post.set('userVoted', instance.get('direction'));
      }

      return Promise.resolve(post);
    })
    .catch(err => {
      console.error('Error fetching post data:', err);
      return Promise.reject(err);
    });
};

module.exports.getPicture = (req, res, next, thumbnail) => {
  const { postid } = req.params;
  const size = thumbnail ? 200 : 640;

  if (!postid) {
    req.error = {
      message: 'Invalid postid.',
      status: 400,
    };
    return next(JSON.stringify(req.error));
  }

  return Models.PostImage.findById(postid)
    .then(instance => {
      if (instance === null) {
        return Promise.reject({
          message: 'Post does not exist.',
          status: 404,
        });
      }

      const ext = instance.get('extension');
      const id = instance.get('id');

      return new Promise((resolve, reject) => Models.Dynamite.aws.s3Client.getSignedUrl('getObject', {
        Bucket: fs.Bucket.PostImagesResized,
        Key: `${id}-${size}.${ext}`,
      }, (err, url) => {
        if (err) {
          return reject(err);
        }
        return resolve(url);
      }));
    })
    .then(url => {
      res.locals.data = url;
      return next();
    })
    .catch(err => {
      console.error('Error fetching post image:', err);
      return next(JSON.stringify(req.error));
    });
};

module.exports.getPictureUploadUrl = (req, res, next) => {
  const { postid } = req.params;
  const username = req.user.get('username');

  if (!postid) {
    req.error = {
      message: 'Invalid postid.',
      status: 400,
    };
    return next(JSON.stringify(req.error));
  }

  // ensure this user is the creator of the specified post
  return Models.PostData.findById(postid)
    .then(instance => {
      if (instance === null) {
        return Promise.reject({
          message: 'Post does not exist.',
          status: 404,
        });
      }

      if (instance.get('creator') !== username) {
        // user did not create this post
        return Promise.reject({
          message: 'You are not the author of the post.',
          status: 403,
        });
      }

      const filename = `${postid}-picture-orig.jpg`;
      const params = {
        Bucket: fs.Bucket.PostImages,
        Key: filename,
        ContentType: 'image/*',
      };

      return new Promise((resolve, reject) => Models.Dynamite.aws.s3Client.getSignedUrl('putObject', params, (err, url) => {
        if (err) {
          return reject(err);
        }
        return resolve(url);
      }));
    })
    .then(url => {
      res.locals.data = url;
      return next();
    })
    .catch(err => {
      console.error('Error fetching post data:', err);
      return next(JSON.stringify(req.error));
    });
};

module.exports.getPostPicture = (postid, thumbnail = false) => {
  const size = thumbnail ? 200 : 640;
  return Models.PostImage.findById(createPostImageId(postid))
    .then(instance => {
      if (instance === null) {
        return Promise.resolve('');
      }

      const extension = instance.get('extension');
      const id = instance.get('id');

      const Bucket = fs.Bucket.PostImagesResized;
      const Key = `${id}-${size}.${extension}`;
      return Promise.resolve(`https://${Bucket}.s3-eu-west-1.amazonaws.com/${Key}`);
    })
    .catch(err => {
      console.error('Error fetching post image:', err);
      return Promise.reject(err);
    });
};

module.exports.post = (req, res, next) => {
  let {
    branches,
    captcha,
    locked,
    nsfw,
    pollAnswers,
    text,
    title,
    type,
    url,
  } = req.body;
  const username = req.user.get('username');
  const date = new Date().getTime();
  const id = createPostId(username, date);
  // Contains the list of all branches the post should be tagged to. This is different
  // from the client supplied branches as those can be multiple levels deep.
  let branchidsArr = [];
  let searchIndexData = {};

  locked = !!locked;
  nsfw = !!nsfw;

  if (captcha !== '') {
    Models.Logger.record('HoneyPot', JSON.stringify({
      branches,
      captcha,
      id,
      locked,
      nsfw,
      text,
      title,
      type,
      url,
    }))
      .catch(err => console.log(err));

    req.error = {
      status: 403,
    };
    return next(JSON.stringify(req.error));
  }

  let error = '';
  if (!validator.postType(type)) {
    error = 'Invalid type.';
  }
  else if ((type === PostTypeText && !text) || (text && !validator.postText(text))) {
    error = 'Invalid text.';
  }
  else if (!title || title.length > postTitle) {
    error = 'Invalid title.';
  }
  else if (text.length > postText) {
    error = 'Invalid title.';
  }
  else if (!Array.isArray(branches)) {
    error = 'Invalid branches.';
  }
  else if (branches.length > (5 + (branches.includes('root') ? 1 : 0))) {
    error = 'Max 5 tags allowed.';
  }
  else if (([PostTypeText, PostTypePoll].includes(type) && url) ||
    (![PostTypeText, PostTypePoll].includes(type) && !validator.url(url))) {
    error = 'Invalid url.';
  }
  else if (type === PostTypePoll && (!Array.isArray(pollAnswers) || (locked && pollAnswers.length < 2))) {
    error = 'Invalid pollAnswers.';
  }

  if (error) {
    req.error = {
      message: error,
      status: 400,
    };
    return next(JSON.stringify(req.error));
  }

  if (type !== PostTypePoll) {
    locked = false;
    pollAnswers = [];
  }

  if (!branches.includes('root')) {
    branches = [
      'root',
      ...branches,
    ];
  }

  if ([PostTypePoll, PostTypeText].includes(type)) url = null;
  if (!text) text = null;

  let promises = [];

  for (let i = 0; i < branches.length; i += 1) {
    const promise = Models.Tag.findByBranch(branches[i])
      .then(tags => {
        // All tags are collected, these are the branchids to tag the post to.
        for (let j = 0; j < tags.length; j += 1) {
          const tag = tags[j].get('tag');
          if (!branchidsArr.includes(tag)) {
            branchidsArr = [
              ...branchidsArr,
              tag,
            ];
          }
        }

        return Promise.resolve();
      })
      .catch(err => Promise.reject(err));

    promises = [
      ...promises,
      promise,
    ];
  }

  return Promise.all(promises)
    .then(() => {
      const data = {
        creator: username,
        id,
        original_branches: JSON.stringify(branches),
        text,
        title,
        type,
        url,
      };

      searchIndexData = data;
      return Models.PostData.create(data);
    })
    // Now create the branch ids.
    .then(() => {
      let promises = [];

      for (let i = 0; i < branchidsArr.length; i += 1) {
        const branchid = branchidsArr[i];
        const promise = Models.Post.create({
          branchid,
          comment_count: 0,
          date,
          down: 0,
          global: 1,
          id,
          individual: branchid === 'root' ? 1 : 0,
          local: branchid === 'root' ? 1 : 0,
          locked,
          nsfw,
          type,
          up: branchid === 'root' ? 1 : 0,
        });

        searchIndexData.global = 0;

        promises = [
          ...promises,
          promise,
        ];
      }

      return Promise.all(promises);
    })
    // Add new post to the search index.
    // .then(() => algolia.addObjects(searchIndexData, 'post'))
    // Increment the post counters on the branch objects
    .then(() => {
      let promises = [];

      for (let i = 0; i < branchidsArr.length; i += 1) {
        const promise = Models.Branch.findById(branchidsArr[i])
          .then(instance => {
            if (instance === null) {
              return Promise.reject({
                message: 'Branch does not exist.',
                status: 404,
              });
            }

            instance.set('post_count', instance.get('post_count') + 1);
            instance.set('post_points', instance.get('post_points') + 1);
            return instance.update();
          })
          .catch(err => Promise.reject(err));

        promises = [
          ...promises,
          promise,
        ];
      }

      return Promise.all(promises);
    })
    // Increment user's post count.
    .then(() => {
      req.user.set('num_posts', req.user.get('num_posts') + 1);
      return req.user.update();
    })
    // Add all poll answers.
    .then(() => {
      let promises = [];

      // We need to use fake timestamps because the id has to be unique...
      pollAnswers.forEach((answer, index) => {
        const promise = Models.PollAnswer.create({
          creator: username,
          date,
          id: createPollAnswerId(id, date + index),
          postid: id,
          text: answer,
          votes: 0,
        });

        promises = [
          ...promises,
          promise,
        ];
      });

      return Promise.all(promises);
    })
    // Self-upvote the post.
    .then(() => Models.UserVote.create({
      direction: 'up',
      itemid: createUserVoteItemId(id, 'post'),
      username,
    }))
    .then(() => {
      slack.newPost(username, id, title, type, branches);
      res.locals.data = id;
      return next();
    })
    .catch(err => {
      console.error('Error creating post:', err);

      if (typeof err === 'object' && err.status) {
        req.error = err;
      }

      return next(JSON.stringify(req.error));
    });
};

module.exports.postComment = async (req, res, next) => {
  try {
    const { parentid, text } = req.body
    const { postid } = req.params
    const date = new Date().getTime()
    const username = req.user.get('username')
    const id = createCommentId(username, date)

    if (!parentid) throw {
      message: 'Invalid parentid.',
      status: 400,
    }

    if (!postid) throw {
      message: 'Invalid postid.',
      status: 400,
    }

    // Post must exist.
    const posts = await Models.Post.findById(postid)
    if (!posts.length || posts[0] === null) throw {
      message: 'Post does not exist.',
      status: 404,
    }

    // If we are replying to a comment thread, ensure the parent comment
    // exists and belongs to the same post.
    let parent
    if (parentid !== 'none') {
      parent = await Models.Comment.findById(parentid)

      if (parent === null) throw {
        message: 'Parent comment does not exist.',
        status: 400,
      }

      if (parent.get('postid') !== postid) throw {
        message: 'Parent comment does not belong to the same post.',
        status: 400,
      }

      parent.set('replies', parent.get('replies') + 1)
      await parent.update()
    }

    await Models.CommentData.create({
      creator: username,
      date,
      edited: false,
      id,
      text,
    })

    await Models.Comment.create({
      date,
      down: 0,
      id,
      individual: 1,
      parentid,
      postid,
      rank: 0,
      replies: 0,
      up: 1,
    })

    // Increment the number of comments on the post and the post comments count
    // on each branch object the post appears in.
    let promises = new List()
    posts.forEach(post => {
      const promise = async () => {
        const branch = await Models.Branch.findById(post.get('branchid'))
        if (branch) {
          post.set('comment_count', post.get('comment_count') + 1)
          await post.update()
          branch.set('post_comments', branch.get('post_comments') + 1)
          await branch.update()
        }
      }
      promises = promises.push(promise())
    })
    await Promise.all(promises.toArray())

    // Notify the post or comment author that a comment has been posted
    // on their content. If the comment is a reply to someone, we will
    // notify the comment author. Otherwise, the comment is a root comment
    // and we will notify the post author.
    const model = parentid === 'none' ? Models.PostData : Models.CommentData
    const instance = await model.findById(parentid === 'none' ? postid : parentid)
    if (instance === null) throw {
      message: `${parentid === 'none' ? 'Post' : 'Comment'} does not exist.`,
      status: 404,
    }
    const author = instance.get('creator')

    // Get the id of a branch where the post appears. Take the first branch
    // this post appears in (there are many) for the purposes of viewing the
    // notification. (todo WHY?)
    const data = { author, branchid: posts[0].get('branchid') }

    // Notify the author that their content has been interacted with. Skip if
    // interacting with our own content or replying to a deleted comment.
    if (username !== data.author && (parentid === 'none' || data.author !== 'N/A')) {
      await Models.Notification.create({
        data: {
          branchid: data.branchid,
          commentid: id,
          parentid,
          postid,
          username,
        },
        date,
        id: createNotificationId(data.author, date),
        type: NotificationTypes.COMMENT,
        unread: true,
        user: data.author,
      })
    }

    req.user.set('num_comments', req.user.get('num_comments') + 1)
    await req.user.update()

    // Self-upvote the comment.
    await Models.UserVote.create({
      direction: 'up',
      itemid: createUserVoteItemId(id, 'comment'),
      username,
    })

    res.locals.data = id
    next()
  }
  catch (e) {
    const error = typeof e === 'object' && e.status ? e : { status: 404 }
    req.error = error
    next(JSON.stringify(req.error))
  }
}

module.exports.voteComment = (req, res, next) => {
  const {
    commentid,
    postid,
  } = req.params;
  const { vote } = req.body;
  const username = req.user.get('username');
  const itemid = createUserVoteItemId(commentid, 'comment');

  let comment;
  let resData = { delta: 0 };
  let voteInstance;

  if (!postid) {
    req.error = {
      message: 'Invalid postid.',
      status: 400,
    };
    return next(JSON.stringify(req.error));
  }

  if (!commentid) {
    req.error = {
      message: 'Invalid commentid.',
      status: 400,
    };
    return next(JSON.stringify(req.error));
  }

  if (!VoteDirections.includes(vote)) {
    req.error = {
      message: 'Invalid vote parameter.',
      status: 400,
    };
    return next(JSON.stringify(req.error));
  }

  return Models.Comment.findById(commentid)
    .then(instance => {
      if (instance === null) {
        return Promise.reject({
          message: 'Comment does not exist.',
          status: 404,
        });
      }

      comment = instance;
      return Models.CommentData.findById(commentid);
    })
    .then(instance => {
      if (instance === null) {
        return Promise.reject({
          message: 'Comment does not exist.',
          status: 404,
        });
      }

      if (instance.get('creator') === 'N/A') {
        return Promise.reject({
          message: 'You cannot vote on deleted comments.',
          status: 403,
        });
      }

      return Models.UserVote.findByUsernameAndItemId(username, itemid);
    })
    .then(instance => {
      if (instance) {
        voteInstance = instance;
      }

      return Promise.resolve();
    })
    // Update the comment 'up' attribute.
    .then(() => {
      // Check the specfied comment actually belongs to this post.
      if (comment.get('postid') !== postid) {
        return Promise.reject({
          message: 'Comment does not exist.',
          status: 404,
        });
      }

      resData.delta = voteInstance ? -1 : 1;
      comment.set(vote, comment.get(vote) + resData.delta);
      return comment.update();
    })
    // Create, update, or delete the vote record in the database.
    .then(() => {
      if (voteInstance) {
        return voteInstance.destroy();
      }

      return Models.UserVote.create({
        direction: vote,
        itemid,
        username,
      });
    })
    .then(() => {
      res.locals.data = resData;
      return next();
    })
    .catch(err => {
      console.error('Error updating comment:', err);

      if (typeof err === 'object' && err.status) {
        req.error = err;
        return next(JSON.stringify(req.error));
      }

      req.error = {
        message: err,
      };
      return next(JSON.stringify(req.error));
    });
};
