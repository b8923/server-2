'use strict';

var db = require('../config/database.js');
var success = require('./responses/successes.js');
var error = require('./responses/errors.js');

module.exports = function(dbClient) {
  return {
    // TODO: access controls on what user info is sent back, inc. yourself vs other users
    getSelf: function(req, res) {
      if(!req.user.username) {
        console.error("No username found in session.");
        return error.InternalServerError(res);
      }

      dbClient.get({
        TableName: db.Table.Users,
        Key: {
          'username': req.user.username
        }
      }, function(err, data) {
        if(err) {
          return error.InternalServerError(res);
        }
        var user = {
          username: data.Item.username
        };
        return success.OK(res, user);
      });
    },
    get:  function(req, res) {

      if(!req.params.username) {
        return error.BadRequest(res);
      }

      dbClient.get({
        TableName: db.Table.Users,
        Key: {
          'username': req.params.username
        }
      }, function(err, data) {
        if(err) {
          return error.InternalServerError(res);
        }

        var user = {
          username: data.Item.username
        };

        return success.OK(res, user);
      });
    }
  };
};
