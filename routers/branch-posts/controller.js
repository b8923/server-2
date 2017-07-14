'use strict';

const ACL = require('../../config/acl');
const aws = require('../../config/aws');
const Branch = require('../../models/branch.model');
const error  = require('../../responses/errors');
const FlaggedPost = require('../../models/flagged-post.model');
const fs  = require('../../config/filestorage');
const Mod = require('../../models/mod.model');
const Notification = require('../../models/notification.model');
const NotificationTypes = require('../../config/notification-types');
const Post = require('../../models/post.model');
const PostData  = require('../../models/post-data.model');
const PostImage = require('../../models/post-image.model');
const success   = require('../../responses/successes');
const User = require('../../models/user.model');
const Vote = require('../../models/user-vote.model');

const VALID_POST_TYPE_VALUES = [
  'all',
  'audio',
  'image',
  'page',
  'poll',
  'text',
  'video',
];
const VALID_SORT_BY_MOD_VALUES = [
  'branch_rules',
  'date',
  'nsfw',
  'site_rules',
  'wrong_type',
];
const VALID_SORT_BY_USER_VALUES = [
  'comment_count',
  'date',
  'points',
];

function userCanDisplayNSFWPosts(req) {
  return new Promise((resolve, reject) => {
    if (req.isAuthenticated() && req.user.username) {
      const user = new User();

      user.findByUsername(req.user.username)
        .then(() => resolve(user.data.show_nsfw))
        .catch(reject);
    }
    else {
      return resolve(false);
    }
  });
}

const put = {
  verifyParams(req) {
    if (!req.params.branchid) {
      return Promise.reject({
        code: 400,
        message: 'Missing branchid',
      });
    }

    if (!req.params.postid) {
      return Promise.reject({
        code: 400,
        message: 'Missing postid.',
      });
    }

    if (!req.user.username) {
      console.error('No username found in session.');
      return Promise.reject({ code: 500 });
    }

    if (!req.body.vote || (req.body.vote !== 'up' && req.body.vote !== 'down')) {
      return Promise.reject({
        code: 400,
        message: 'Missing or malformed vote parameter.',
      });
    }

    return Promise.resolve();
  },
};

module.exports = {
  get(req, res) {
    if (!req.params.branchid) {
      return error.BadRequest(res, 'Missing branchid');
    }

    let opts = {
      fetchOnlyflaggedPosts: 'true' === req.query.flag,
      nsfw: false,
      postType: req.query.postType  || 'all',
      // points, date, comment_count [if normal posts]
      // date, branch_rules, site_rules, wrong_type [if flagged posts i.e. flag = true]
      sortBy: '',
      // individual/local/global stats [if normal posts]
      stat: req.query.stat || 'individual',
      timeafter: req.query.timeafter || 0,
    };

    opts.sortBy = req.query.sortBy || (opts.fetchOnlyflaggedPosts ? 'date' : 'points');
    
    if (!VALID_POST_TYPE_VALUES.includes(opts.postType)) {
      return error.BadRequest(res, 'Invalid postType');
    }

    let lastPost = null;
    let posts = [];
    let postDatas  = [];
    let postImages = [];
    
    new Promise((resolve, reject) => {
      // Client wants only results that appear after this post (pagination).
      if (req.query.lastPostId) {
        const post = new Post();
        const postdata = new PostData();

        // get the post
        post.findByPostAndBranchIds(req.query.lastPostId, req.params.branchid)
          // fetch post data
          .then(() => postdata.findById(req.query.lastPostId) )
          .then(() => {
            // create lastPost object
            lastPost = post.data;
            lastPost.data = postdata.data;
            return resolve();
          })
          .catch(err => {
            if (err) {
              return reject();
            }

            // Invalid lastPostId.
            return error.NotFound(res);
          });
      }
      else {
        // No last post specified, continue...
        return resolve();
      }
    })
      // Authenticated users can set to display nsfw posts.
      .then(() => new Promise((resolve, reject) => {
          userCanDisplayNSFWPosts(req)
            .then(displayNSFWPosts => {
              opts.nsfw = displayNSFWPosts;
              return resolve();
            })
            .catch(reject);
      }))
      .then(() => new Promise((resolve, reject) => {
        const validValues = opts.fetchOnlyflaggedPosts ? VALID_SORT_BY_MOD_VALUES : VALID_SORT_BY_USER_VALUES;

        if (!validValues.includes(opts.sortBy)) {
          return error.BadRequest(res, 'Invalid sortBy parameter');
        }

        if (opts.fetchOnlyflaggedPosts) {
          if (!req.user) {
            return error.Forbidden(res);
          }

          // User must be a mod.
          ACL.validateRole(ACL.Roles.Moderator, req.params.branchid)(req, res, resolve);
        }
        else {
          return resolve();
        }
      }))
      .then(() => {
        const post = opts.fetchOnlyflaggedPosts ? new FlaggedPost() : new Post();
        return post.findByBranch(req.params.branchid, opts.timeafter, opts.nsfw, opts.sortBy, opts.stat, opts.postType, lastPost);
      })
      .then(results => {
        let promises = [];
        posts = results;
        
        // fetch post data for each post
        for (let i = 0; i < posts.length; i += 1) {
          const postdata = new PostData();
          promises.push(postdata.findById(posts[i].id));
          postDatas.push(postdata);
        }

        return Promise.all(promises);
      })
      .then(() => {
        let promises = [];

        for (let i = 0; i < posts.length; i += 1) {
          // attach post data to each post
          posts[i].data = postDatas[i].data;
          
          promises.push(new Promise((resolve, reject) => {
            new PostImage().findById(posts[i].id)
              .then(postimage => {
                const Bucket = fs.Bucket.PostImagesResized;
                const Key = `${postimage.id}-640.${postimage.extension}`;
                return resolve(`https://${Bucket}.s3-eu-west-1.amazonaws.com/${Key}`);
              })
              .catch(err => {
                if (err) {
                  return reject();
                }

                return resolve('');
              });
          }));
        }

        return Promise.all(promises);
      })
      .then(urls => {
        let promises = [];

        for (let i = 0; i < posts.length; i += 1) {
          // attach post image url to each post
          posts[i].profileUrl = urls[i];
          
          promises.push(new Promise((resolve, reject) => {
            new PostImage().findById(posts[i].id)
              .then(postimage => {
                const Bucket = fs.Bucket.PostImagesResized;
                const Key = `${postimage.id}-200.${postimage.extension}`;
                return resolve(`https://${Bucket}.s3-eu-west-1.amazonaws.com/${Key}`);
              })
              .catch(err => {
                if (err) {
                  return reject();
                }

                return resolve('');
              });
          }));
        }

        return Promise.all(promises);
      })
      .then(urls => {

        // attach post image thumbnail url to each post
        for (let i = 0; i < posts.length; i += 1) {
          posts[i].profileUrlThumb = urls[i];
        }

        return success.OK(res, posts);
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
        return error.InternalServerError(res);
      });
  },

  put(req, res) {
    const branchIds = [];
    // check user hasn't already voted on this post
    const vote = new Vote();

    let newVoteDirection;
    let newVoteOppositeDirection;
    let post;
    let resData = { delta: 0 };
    let userAlreadyVoted = false;

    put.verifyParams(req)
      .then(() => {
        post = new Post({
          branchid: req.params.branchid,
          id: req.params.postid,
        });

        newVoteDirection = req.body.vote;

        return vote.findByUsernameAndItemId(req.user.username, `post-${req.params.postid}`);
      })
      .then(existingVoteData => {
        if (existingVoteData) {
          userAlreadyVoted = true;

          if (existingVoteData.direction !== newVoteDirection) {
            newVoteOppositeDirection = newVoteDirection === 'up' ? 'down' : 'up';
          }
        }

        return Promise.resolve();
      })
      .then(() => new Post().findById(req.params.postid))
      // Update the post "up" and "down" attributes.
      // Vote stats will be auto-updated by a lambda function.
      .then(posts => {
        // find all post entries to get the list of branches it is tagged to
        let promise;

        for (let i = 0; i < posts.length; i += 1) {
          branchIds.push(posts[i].branchid);

          // Find the post on the specified branchid.
          if (posts[i].branchid === req.params.branchid) {
            if (userAlreadyVoted) {
              // Undo the last vote and add the new vote.
              if (newVoteOppositeDirection) {
                post.set(newVoteOppositeDirection, posts[i][newVoteOppositeDirection] - 1);
                post.set(newVoteDirection, posts[i][newVoteDirection] + 1);
              }
              // Undo the last vote.
              else {
                post.set(newVoteDirection, posts[i][newVoteDirection] - 1);
              }
            }
            else {
              post.set(newVoteDirection, posts[i][newVoteDirection] + 1);
            }

            promise = post.update();
          }
        }

        if (!promise) {
          return Promise.reject({
            code: 400,
            message: 'Invalid branchid',
          });
        }

        return promise;
      })
      // Update the post points count on each branch object the post appears in.
      .then(() => {
        const promises = [];

        let delta = 0;

        if (userAlreadyVoted) {
          if (newVoteOppositeDirection) {
            delta = (newVoteOppositeDirection === 'up') ? 2 : -2;
          }
          else {
            delta = (newVoteDirection === 'up') ? -1 : 1;
          }
        }
        else {
          delta = (newVoteDirection === 'up') ? 1 : -1;
        }

        resData.delta = delta;

        for (let i = 0; i < branchIds.length; i += 1) {
          promises.push(new Promise((resolve, reject) => {
            const branch = new Branch();

            branch.findById(branchIds[i])
              .then(() => {
                branch.set('post_points', branch.data.post_points + delta);

                branch
                  .update()
                  .then(resolve)
                  .catch(reject);
              })
              .catch(reject);
          }));
        }

        return Promise.all(promises);
      })
      // Create, update, or delete the vote record in the database.
      .then(() => {
        if (userAlreadyVoted) {
          if (newVoteOppositeDirection) {
            vote.set('direction', newVoteDirection);
            return vote.update();
          }

          return vote.delete();
        } 
        
        // new vote: store this vote in the table
        const newVote = new Vote({
          direction: newVoteDirection,
          itemid: `post-${req.params.postid}`,
          username: req.user.username,
        });

        // validate vote properties
        const propertiesToCheck = [
          'itemid',
          'username',
        ];

        const invalids = newVote.validate(propertiesToCheck);

        if (invalids.length > 0) {
          console.error('Error creating Vote: invalid ', invalids[0]);
          return Promise.reject({ code: 500 });
        }

        return newVote.save();
      })
      .then(() => success.OK(res, resData))
      .catch(err => {
        if (err) {
          if (typeof err === 'object' && err.code) {
            return error.code(res, err.code, err.message);
          }

          console.error('Error voting on a post: ', err);
          return error.InternalServerError(res);
        }

        return error.NotFound(res);
      });
  },

  getPost (req, res) {
    if(!req.params.branchid) {
      return error.BadRequest(res, 'Missing branchid');
    }
    if(!req.params.postid) {
      return error.BadRequest(res, 'Missing postid');
    }

    var post = new Post();
    post.findByPostAndBranchIds(req.params.postid, req.params.branchid).then(function() {
      return success.OK(res, post.data);
    }, function(err) {
      if(err) {
        console.error('Error fetching post on branch:', err);
        return error.InternalServerError(res);
      }
      return error.NotFound(res);
    });
  },

  resolveFlag (req, res) {
    if(!req.params.branchid) {
      return error.BadRequest(res, 'Missing branchid');
    }
    if(!req.params.postid) {
      return error.BadRequest(res, 'Missing postid');
    }
    if(!req.user.username) {
      console.error("No username found in session.");
      return error.InternalServerError(res);
    }

    if(!req.body.action || (req.body.action !== 'change_type' && req.body.action !== 'remove' && req.body.action !== 'approve' && req.body.action !== 'mark_nsfw')) {
      return error.BadRequest(res, 'Missing/invalid action parameter');
    }

    if(req.body.action === 'change_type' && !req.body.type) {
      return error.BadRequest(res, 'Missing type parameter');
    }
    if(req.body.action === 'remove' && !req.body.reason) {
      return error.BadRequest(res, 'Missing reason parameter');
    }

    if(req.body.action === 'change_type' || req.body.action === 'mark_nsfw') {
      var originalpost = new Post();
      var postdata = new PostData();
      // get the post's data
      postdata.findById(req.params.postid).then(function() {
        if(req.body.action === 'change_type') {
          // change post type for all branches it appears in
          return new Post().findById(req.params.postid);
        } else {
          // get the original post
          return originalpost.findByPostAndBranchIds(req.params.postid, req.params.branchid);
        }
      }).then(function(posts) {
        if(req.body.action === 'change_type') {
          if(!posts || posts.length === 0) {
            return error.NotFound(res);
          }
          var promises = [];
          for(var i = 0; i < posts.length; i += 1) {
            var post = new Post();
            post.set('type', req.body.type);
            // validate post properties
            var propertiesToCheck = ['type'];
            var invalids = post.validate(propertiesToCheck);
            if(invalids.length > 0) {
              return error.BadRequest(res, 'Invalid type parameter');
            }
            promises.push(post.update({
              id: posts[i].id,
              branchid: posts[i].branchid
            }));
          }
          return Promise.all(promises);
        } else {
          originalpost.set('nsfw', true);
          return originalpost.update();
        }
      }).then(function () {
        // now delete post flags
        return new FlaggedPost().delete({
          id: req.params.postid,
          branchid: req.params.branchid
        });
      }).then(function() {
        // notify the OP that their post type was changed
        var time = new Date().getTime();
        var notification = new Notification({
          id: postdata.data.creator + '-' + time,
          user: postdata.data.creator,
          date: time,
          unread: true,
          type: (req.body.action === 'change_type') ? NotificationTypes.POST_TYPE_CHANGED : NotificationTypes.POST_MARKED_NSFW,
          data: {
            branchid: req.params.branchid,
            username: req.user.username,
            postid: req.params.postid
          }
        });
        if(req.body.action === 'change_type') notification.data.data.type = req.body.type;

        var propertiesToCheck = ['id', 'user', 'date', 'unread', 'type', 'data'];
        var invalids = notification.validate(propertiesToCheck);
        if(invalids.length > 0) {
          console.error('Error creating notification.');
          return error.InternalServerError(res);
        }
        return notification.save(req.sessionID);
      }).then(function() {
        return success.OK(res);
      }).catch(function(err) {
        if(err) {
          console.error('Error fetching post on branch:', err);
          return error.InternalServerError(res);
        }
        return error.NotFound(res);
      });
    } else if(req.body.action === 'remove') {
      var postdata = new PostData();
      // get the original post
      postdata.findById(req.params.postid).then(function() {
        // delete flag for this post on this branch
        return new FlaggedPost().delete({
          id: req.params.postid,
          branchid: req.params.branchid
        })
      }).then(function() {
        // delete actual post from this branch
        return new Post().delete({
          id: req.params.postid,
          branchid: req.params.branchid
        });
      }).then(function() {
        // notify the OP that their post was removed
        var time = new Date().getTime();
        var notification = new Notification({
          id: postdata.data.creator + '-' + time,
          user: postdata.data.creator,
          date: time,
          unread: true,
          type: NotificationTypes.POST_REMOVED,
          data: {
            branchid: req.params.branchid,
            username: req.user.username,
            postid: req.params.postid,
            reason: req.body.reason,
            message: req.body.message
          }
        });
        var propertiesToCheck = ['id', 'user', 'date', 'unread', 'type', 'data'];
        var invalids = notification.validate(propertiesToCheck);
        if(invalids.length > 0) {
          console.error('Error creating notification.');
          return error.InternalServerError(res);
        }
        return notification.save(req.sessionID);
      }).then(function() {
        // notify global mods of posts removed for breaching site rules
        if(req.body.reason === 'site_rules') {
          var promises = [];
          var time = new Date().getTime();
          // get global mods
          new Mod().findByBranch('root').then(function(mods) {
            for(var i = 0; i < mods.length; i += 1) {
              var notification = new Notification({
                id: mods[i].username + '-' + time,
                user: mods[i].username,
                date: time,
                unread: true,
                type: NotificationTypes.POST_REMOVED,
                data: {
                  branchid: req.params.branchid,
                  username: req.user.username,
                  postid: req.params.postid,
                  reason: req.body.reason,
                  message: req.body.message
                }
              });
              var propertiesToCheck = ['id', 'user', 'date', 'unread', 'type', 'data'];
              var invalids = notification.validate(propertiesToCheck);
              if(invalids.length > 0) {
                console.error('Error creating notification.');
                return error.InternalServerError(res);
              }
              promises.push(notification.save(req.sessionID));
            }
            return Promise.all(promises);
          }).then(function() {
            return success.OK(res);
          }).catch(function(err) {
            console.error("Error sending notification to root mods: ", err);
            return error.InternalServerError(res);
          });
        } else {
          return success.OK(res);
        }
      }).catch(function(err) {
        if(err) {
          console.error('Error fetching post on branch:', err);
          return error.InternalServerError(res);
        }
        return error.NotFound(res);
      });
    } else if(req.body.action === 'approve') {
      // delete flag for this post on this branch
      new FlaggedPost().delete({
        id: req.params.postid,
        branchid: req.params.branchid
      }).then(function() {
        return success.OK(res);
      }).catch(function(err) {
        if(err) {
          console.error('Error fetching post on branch:', err);
          return error.InternalServerError(res);
        }
        return error.NotFound(res);
      });
    } else {
      return error.BadRequest(res, 'Invalid action parameter');
    }
  }
};
