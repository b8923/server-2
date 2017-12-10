const algolia = require('../../config/algolia');
const aws = require('../../config/aws');
const Branch = require('../../models/branch.model');
const BranchImage = require('../../models/branch-image.model');
const Constant = require('../../models/constant');
const error = require('../../responses/errors');
const fs = require('../../config/filestorage');
const mailer = require('../../config/mailer');
const Mod = require('../../models/mod.model');
const ModLogEntry = require('../../models/mod-log-entry.model');
const RequestsController = require('../requests/controller');
const SubBranchRequest = require('../../models/subbranch-request.model');
const success = require('../../responses/successes');
const Tag = require('../../models/tag.model');
const User = require('../../models/user.model');

const fetchBranchPicture = (branchid, type) => new BranchImage()
  .findById(branchid, type)
  .catch(err => {
    if (err) {
      return Promise.reject(err);
    }

    return Promise.resolve();
  });

// Deletes the branch completely and moves all of its children under b/root.
const deleteBranch = branch => {
  const branchCount = new Constant();
  const branchid = branch && branch.data && branch.data.id ? branch.data.id : null;
  const deletedImagesArr = [];
  const deletedImagesResizedArr = [];

  return branch
    .delete({ id: branchid })
    // Fetch branch pictures.
    .then(() => fetchBranchPicture(branchid, 'picture'))
    .then(pic => {
      if (pic) {
        deletedImagesArr.push({ Key: `${pic.id}-orig.${pic.extension}` });
        deletedImagesResizedArr.push({ Key: `${pic.id}-200.${pic.extension}` });
        deletedImagesResizedArr.push({ Key: `${pic.id}-640.${pic.extension}` });
      }

      return fetchBranchPicture(branchid, 'cover');
    })
    // Delete branch profile and cover pictures from storage.
    .then(pic => {
      if (pic) {
        deletedImagesArr.push({ Key: `${pic.id}-orig.${pic.extension}` });
        deletedImagesResizedArr.push({ Key: `${pic.id}-800.${pic.extension}` });
        deletedImagesResizedArr.push({ Key: `${pic.id}-1920.${pic.extension}` });
      }

      if (deletedImagesArr.length === 0) {
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => aws.s3Client.deleteObjects({
        Bucket: fs.Bucket.BranchImages,
        Delete: {
          Objects: deletedImagesArr,
        },
      }, err => {
        if (err) {
          return reject(err);
        }

        return resolve();
      }));
    })
    .then(() => {
      if (deletedImagesResizedArr.length === 0) {
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => {
        return aws.s3Client.deleteObjects({
          Bucket: fs.Bucket.BranchImagesResized,
          Delete: {
            Objects: deletedImagesResizedArr,
          },
        }, err => {
          if (err) {
            return reject(err);
          }

          return resolve();
        });
      });
    })
    // Delete branch pictures from database.
    .then(() => new BranchImage().delete({ id: `${branchid}-picture` }))
    .then(() => new BranchImage().delete({ id: `${branchid}-cover` }))
    // Delete mod log entries.
    .then(() => new ModLogEntry().findByBranch(branchid))
    .then(entries => {
      const promises = [];

      for (let i = 0; i < entries.length; i += 1) {
        promises.push(new ModLogEntry().delete({
          branchid: entries[i].branchid,
          date: entries[i].date,
        }));
      }

      return Promise.all(promises);
    })
    // Delete branch moderators.
    .then(() => new Mod().findByBranch(branchid))
    .then(mods => {
      const promises = [];

      for (let i = 0; i < mods.length; i += 1) {
        promises.push(new Mod().delete({
          branchid: mods[i].branchid,
          date: mods[i].date,
        }));
      }

      return Promise.all(promises);
    })
    // Delete all branch tags.
    .then(() => new Tag().findByBranch(branchid))
    .then(tags => {
      const promises = [];

      for (let i = 0; i < tags.length; i += 1) {
        promises.push(new Tag().delete({
          branchid: tags[i].branchid,
          tag: tags[i].tag,
        }));
      }

      return Promise.all(promises);
    })
    // Delete this branch's tag from its children.
    .then(() => new Tag().findByTag(branchid))
    .then(tags => {
      const promises = [];

      for (let i = 0; i < tags.length; i += 1) {
        promises.push(new Tag().delete({
          branchid: tags[i].branchid,
          tag: tags[i].tag,
        }));
      }

      return Promise.all(promises);
    })
    // Change all direct children parentid to b/root.
    .then(() => branch.findSubbranches(branchid, 0, 'date', null, 0))
    .then(children => {
      const promises = [];

      for (let i = 0; i < children.length; i += 1) {
        const child = new Branch(children[i]);
        child.set('parentid', 'root');
        promises.push(child.update());
      }

      return Promise.all(promises);
    })
    // Decrement the branch_count constant.
    .then(() => branchCount.findById('branch_count'))
    .then(() => {
      branchCount.set('data', branchCount.data.data - 1);
      return branchCount.update();
    })
    .catch(err => Promise.reject(err));
};

// Detaches the branch from its parent and moves it under b/root.
// Tree structure remains unchanged.
const detachBranch = branch => {
  const branchid = branch && branch.data && branch.data.id ? branch.data.id : null;
  const deletedTagsArr = [];

  if (!branchid) {
    return Promise.reject({
      code: 400,
      message: 'Undefined branch id',
    });
  }

  branch.set('parentid', 'root');

  return branch
    .update()
    // Delete all branch tags from the tree root, except for self and b/root.
    .then(() => new Tag().findByBranch(branchid))
    .then(tags => {
      const promises = [];

      for (let i = 0; i < tags.length; i += 1) {
        const tag = tags[i].tag;
        if (tag !== branchid && tag !== 'root') {
          deletedTagsArr.push(tag);
          promises.push(new Tag().delete({ branchid, tag }));
        }
      }

      return Promise.all(promises);
    })
    // Delete all branch tags from tree children.
    .then(() => new Tag().findByTag(branchid))
    .then(tags => {
      const promises = [];

      for (let i = 0; i < tags.length; i += 1) {
        for (let j = 0; j < deletedTagsArr.length; j += 1) {
          promises.push(new Tag().delete({
            branchid: tags[i].branchid,
            tag: deletedTagsArr[j],
          }));
        }
      }

      return Promise.all(promises);
    })
    .catch(err => {
      console.error(`Error detaching b/${branchid}:`, err);
      return Promise.reject(err);
    });
};

module.exports.delete = (req, res) => {
  const childBranch = req.query.child;
  const parentBranch = req.params.branchid;

  const branch = new Branch();
  let child;

  return branch
    .findById(parentBranch)
    // Fetch child branch data if defined.
    .then(() => {
      if (childBranch) {
        child = new Branch();
        return child.findById(childBranch)
          .catch(err => {
            if (err) {
              return Promise.reject(err);
            }
            return Promise.reject({
              code: 404,
              message: `b/${childBranch} doesn't exist`,
            });
          });
      }
      return Promise.resolve();
    })
    // Decide which action to take and check permissions.
    .then(() => {
      if (branch.data.id === 'root') {
        // Delete any branch, we are admins so we can pick any.
        if (child && child.data.id !== 'root') {
          return deleteBranch(child);
        }

        return Promise.reject({
          code: 403,
          message: 'You cannot delete the root branch.',
        });
      }

      // Detach a branch, check if it's a direct child.
      if (child) {
        if (child.data.parentid === branch.data.id) {
          return detachBranch(child);
        }

        return Promise.reject({
          code: 403,
          message: `b/${child.data.id} isn't a direct child branch of b/${branch.data.id}`,
        });
      }

      // Delete this branch.
      return deleteBranch(branch);
    })
    .then(() => success.OK(res))
    .catch(err => {
      if (err) {
        if (typeof err === 'object' && err.code) {
          return error.code(res, err.code, err.message);
        }

        return error.InternalServerError(res);
      }

      return error.NotFound(res, `b/${parentBranch} doesn't exist`);
    });
};

module.exports.get = (req, res) => {
  const branchid = req.params.branchid;

  if (!branchid) {
    return error.BadRequest(res, 'Missing branchid');
  }

  const p1 = module.exports.getBranchPicture(branchid, 'picture', false);
  const p2 = module.exports.getBranchPicture(branchid, 'picture', true);
  const p3 = module.exports.getBranchPicture(branchid, 'cover', false);
  const p4 = module.exports.getBranchPicture(branchid, 'cover', true);

  Promise.all([p1, p2, p3, p4]).then(values => {
    const branch = new Branch();

    branch.findById(branchid)
      .then(() => {
        // Attach parent branch
        /*
        if ('root' === branch.parentid || 'none' === branch.parentid) {
          branch.parent = {
            id: branch.parentid
          };
        }
        else {
          res = yield this.API.fetch('/branch/:branchid', { branchid: branch.parentid });
          branch.parent = res.data;
        }

        delete branch.parentid;
        */

        branch.data.profileUrl = values[0];
        branch.data.profileUrlThumb = values[1];
        branch.data.coverUrl = values[2];
        branch.data.coverUrlThumb = values[3];
        return success.OK(res, branch.data);
      })
      .catch(err => {
        if (err) {
          console.error('Error fetching branch:', err);
          return error.InternalServerError(res);
        }

        return error.NotFound(res);
      });
  });
};

module.exports.getBranchPicture = (branchid, type, thumbnail = false) => {
  return new Promise(resolve => {
    if (!branchid || ('picture' !== type && 'cover' !== type)) return resolve('');

    let size;

    if ('picture' === type) {
      size = thumbnail ? 200 : 640;
    }
    else {
      size = thumbnail ? 800 : 1920;
    }

    const image = new BranchImage();

    image.findById(branchid, type)
      .then(() => {
        let params = '';

        // Append timestamp for correct caching on the client.
        if (image.data.date) {
          params = `?time=${image.data.date}`;
        }

        const Bucket = fs.Bucket.BranchImagesResized;
        const Key = `${image.data.id}-${size}.${image.data.extension}`;
        return resolve(`https://${Bucket}.s3-eu-west-1.amazonaws.com/${Key}${params}`);
      })
      .catch(err => {
        if (err) {
          console.error('Error fetching branch image:', err);
          return resolve('');
        }

        return resolve('');
      });
  });
};

module.exports.getModLog = (req, res) => {
  if (!req.params.branchid) {
    return error.BadRequest(res, 'Missing branchid');
  }

  const log = new ModLogEntry();

  return log
    .findByBranch(req.params.branchid)
    .then(data => success.OK(res, data))
    .catch(err => {
      if (err) {
        console.error('Error fetching mod log:', err);
        return error.InternalServerError(res);
      }

      return error.NotFound(res);
    });
};

module.exports.post = (req, res) => {
  const creator = req.user.username;

  if (!creator) {
    console.error('No username found in session.');
    return error.InternalServerError(res);
  }

  const branchCount = new Constant();
  const user = new User();

  const childBranchId = req.body.id;
  const name = req.body.name;
  const parentBranchId = req.body.parentid;

  const date = new Date().getTime();
  const branch = new Branch({
    creator,
    date,
    id: childBranchId,
    name,
    // By default, every branch is a child of root.
    // We will add request to the parentBranchId below
    // if it's different from root.
    parentid: 'root',
    post_comments: 0,
    post_count: 0,
    post_points: 0,
  });

  const propertiesToCheck = ['id', 'name', 'creator', 'date', 'parentid'];
  const invalids = branch.validate(propertiesToCheck);
  if (invalids.length > 0) {
    return error.BadRequest(res, invalids[0]);
  }

  return new Branch()
    .findById(childBranchId)
    .then(() => Promise.reject({
      code: 400,
      message: `${childBranchId} already exists`,
    }))
    // If there was a genuine error, abort the operation.
    // Otherwise it only means the branch with this name doesn't exist yet.
    .catch(err => err ? Promise.reject(err) : Promise.resolve())
    // The parent branch must exist.
    .then(() => new Branch().findById(parentBranchId))
    // If we are attaching branch to anything other than root, we will
    // need a permission to do so before moving it there.
    .then(() => {
      if (parentBranchId === 'root') {
        return Promise.resolve();
      }

      const request = new SubBranchRequest({
        childid: childBranchId,
        creator,
        date,
        parentid: parentBranchId,
      });

      const invalids = request.validate();
      if (invalids.length > 0) {
        return Promise.reject({
          code: 400,
          message: invalids[0],
        });
      }

      return request.save();
    })
    // Make the user automatically the only moderator of this new branch.
    .then(() => {
      const mod = new Mod({
        branchid: childBranchId,
        date,
        username: creator,
      });

      const invalids = mod.validate();
      if (invalids.length > 0) {
        return Promise.reject({
          code: 400,
          message: invalids[0],
        });
      }

      return mod.save();
    })
    // Create the new branch.
    .then(() => branch.save())
    // Add new branch to the search index.
    .then(() => algolia.addObjects(branch.data, 'branch'))
    // Create tags for the new branch - since it's only a child of root for now,
    // these will always be equal to 'root' and childBranchId.
    // Skip validation as we have already established above that childBranchId
    // is valid. We have created a branch with its name, after all.
    .then(() => new Tag({
      branchid: childBranchId,
      tag: childBranchId,
    })
      .save()
    )
    .then(() => new Tag({
      branchid: childBranchId,
      tag: 'root',
    })
      .save()
    )
    // Increase user's branch and mod count.
    .then(() => user.findByUsername(creator))
    .then(() => {
      user.set('num_branches', user.data.num_branches + 1);
      user.set('num_mod_positions', user.data.num_mod_positions + 1);
      return user.update();
    })
    // Update the SendGrid contact list with the new user data.
    .then(() => mailer.addContact(user.data, true))
    // Update branch_count.
    .then(() => branchCount.findById('branch_count'))
    .then(() => {
      branchCount.set('data', branchCount.data.data + 1);
      return branchCount.update();
    })
    // Remember how we put this branch under root because we might need a permission
    // in case we want to attach it to any branch other than root? Well, here we will
    // find out if we really need a permission to move this newly created branch.
    .then(() => {
      if (parentBranchId === 'root') {
        return Promise.resolve();
      }

      return new Mod().findByBranch(parentBranchId);
    })
    .then(mods => {
      // We don't need a permission but there is also
      // nothing to move as we are already under root,
      // so we can end it here.
      if (parentBranchId === 'root') {
        return success.OK(res);
      }

      mods = mods.map(obj => obj.username);

      // We don't need a permission.
      if (mods.includes(creator)) {
        // Inject the action parameter to the request so it doesn't
        // fail while accepting the branch request.
        req.body.action = 'accept';
        req.params.childid = childBranchId;
        req.params.branchid = parentBranchId;
        return RequestsController.put(req, res);
      }

      // We need a permission, end it here.
      return success.OK(res);
    })
    .catch(err => {
      if (err) {
        if (typeof err === 'object' && err.code) {
          return error.code(res, err.code, err.message);
        }
      }

      return error.InternalServerError(res);
    });
};

module.exports.put = (req, res) => {
  const { branchid } = req.params;
  const {
    description,
    name,
    rules,
  } = req.body;
  let propertiesToCheck = [];

  if (!branchid) {
    return error.BadRequest(res, 'Missing branchid');
  }

  const branch = new Branch({ id: branchid });  

  if (description !== undefined) {
    branch.set('description', description);
    propertiesToCheck = [
      ...propertiesToCheck,
      'description',
    ];
  }

  if (name !== undefined) {
    branch.set('name', name);
    propertiesToCheck = [
      ...propertiesToCheck,
      'name',
    ];
  }

  if (rules !== undefined) {
    branch.set('rules', rules);
    propertiesToCheck = [
      ...propertiesToCheck,
      'rules',
    ];
  }

  // Check new parameters are valid, ignoring id validity
  const invalids = branch.validate(propertiesToCheck);
  if (invalids.length) {
    return error.BadRequest(res, invalids[0]);
  }

  return branch.update()
    // Update branch in the search index.
    .then(() => algolia.updateObjects(branch.data, 'branch'))
    .then(() => success.OK(res))
    .catch(() => error.InternalServerError(res));
};







module.exports.getPictureUploadUrl = (req, res, type) => {
  if (!req.user || !req.user.username) {
    return error.Forbidden(res);
  }

  if (!req.params.branchid) {
    return error.BadRequest(res, 'Missing branchid');
  }

  if (type !== 'picture' && type !== 'cover') {
    return error.InternalServerError(res);
  }

  aws.s3Client.getSignedUrl('putObject', {
    Bucket: fs.Bucket.BranchImages,
    ContentType: 'image/*',
    Key: `${req.params.branchid}-${type}-orig.jpg`,
  }, (err, url) => {
    return success.OK(res, url);
  });
};

module.exports.getPicture = (req, res, type, thumbnail) => {
  if (!req.params.branchid) {
    return error.BadRequest(res, 'Missing branchid');
  }

  if (type !== 'picture' && type !== 'cover') {
    return error.InternalServerError(res);
  }

  let size;

  if (type === 'picture') {
    size = thumbnail ? 200 : 640;
  }
  else {
    size = thumbnail ? 800 : 1920;
  }

  const image = new BranchImage();

  image.findById(req.params.branchid, type)
    .then(() => {
      aws.s3Client.getSignedUrl('getObject', {
        Bucket: fs.Bucket.BranchImagesResized,
        Key: `${image.data.id}-${size}.${image.data.extension}`,
      }, (err, url) => {
        if (err) {
          return error.InternalServerError(res);
        }

        return success.OK(res, url);
      });
    })
    .catch(err => {
      if (err) {
        return error.InternalServerError(res);
      }

      return error.NotFound(res);
    });
};

module.exports.getSubbranches = (req, res) => {
  const branchid = req.params.branchid;
  const timeafter = req.query.timeafter;

  if (!branchid) {
    return error.BadRequest(res, 'Missing branchid');
  }

  if (!timeafter) {
    return error.BadRequest(res, 'Missing timeafter');
  }

  const branch = new Branch();
  const sortBy = req.query.sortBy || 'date';

  let branches = [];
  let lastBranch = null;
  
  // if lastBranchId is specified, client wants results which appear _after_ this branch (pagination)
  return new Promise((resolve, reject) => {
    if (req.query.lastBranchId) {
      const last = new Branch();

      // get the branch
      return last.findById(req.query.lastBranchId)
        .then(() => {
          lastBranch = last.data;
          return resolve();
        })
        .catch(err => {
          if (err) {
            return reject(err);
          }

          return reject({ code: 404 });
        });
    }

    // No last branch specified, continue.
    return resolve();
  })
    .then(() => branch.findSubbranches(branchid, timeafter, sortBy, lastBranch))
    // Attach branch profile images.
    .then(results => {
      branches = results;

      let promises = [];

      for (let i = 0; i < branches.length; i += 1) {
        promises.push(new Promise((resolve, reject) => {
          new BranchImage()
            .findById(branches[i].id, 'picture')
            .then(branchimage => {
              const time = branchimage.date ? `?time=${branchimage.date}` : '';
              const Bucket = fs.Bucket.BranchImagesResized;
              const Key = `${branchimage.id}-640.${branchimage.extension}`;
              return resolve(`https://${Bucket}.s3-eu-west-1.amazonaws.com/${Key}${time}`);
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
    // Attach branch thumbnail images.
    .then(urls => {
      let promises = [];
      
      for (let i = 0; i < branches.length; i += 1) {
        // attach branch image url to each branch
        branches[i].profileUrl = urls[i];
        
        promises.push(new Promise((resolve, reject) => {
          new BranchImage().findById(branches[i].id, 'picture')
            .then(branchimage => {
              const time = branchimage.date ? `?time=${branchimage.date}` : '';
              const Bucket = fs.Bucket.BranchImagesResized;
              const Key = `${branchimage.id}-200.${branchimage.extension}`;
              return resolve(`https://${Bucket}.s3-eu-west-1.amazonaws.com/${Key}${time}`);
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
      // attach branch image thumbnail url to each branch
      for (let i = 0; i < branches.length; i += 1) {
        branches[i].profileUrlThumb = urls[i];
      }

      return success.OK(res, branches);
    })
    .catch(err => {
      console.error('Error fetching subbranches:', err);
      return error.InternalServerError(res);
    });
};
