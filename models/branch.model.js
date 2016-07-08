'use strict';

var Model = require('./model.js');
var db = require('../config/database.js');
var aws = require('../config/aws.js');

var Branch = function(data) {
  this.config = {
    schema: db.Schema.Branch,
    table: db.Table.Branches,
    keys: db.Keys.Branches
  };
  this.data = this.sanitize(data);
};

// Branch model inherits from Model
Branch.prototype = Object.create(Model.prototype);
Branch.prototype.constructor = Branch;

// Validate the properties specified in 'properties' on the branch object,
// returning an array of any invalid ones
Branch.prototype.validate = function(properties) {
  var invalids = [];

  // ensure id exists and is of correct length
  if(properties.indexOf('id') > -1) {
    if(!this.data.id || this.data.id.length < 1 || this.data.id.length > 30) {
      invalids.push('id');
    }
    // ensure id contains no whitespace
    if(/\s/g.test(this.data.id)) {
      invalids.push('id');
    }
  }

  // ensure name exists and is of correct length
  if(properties.indexOf('name') > -1) {
    if(!this.data.name || this.data.name.length < 1 || this.data.name.length > 30) {
      invalids.push('name');
    }
  }

  // ensure mods is an array with at least one entry
  if(properties.indexOf('mods') > -1) {
    if(!this.data.mods || this.data.mods.constructor !== Array || this.data.mods.length < 1) {
      invalids.push('mods');
    }
  }

  // TODO ensure each mod is a valid username
  // TODO ensure creator is valid username
  if(properties.indexOf('creator') > -1) {
    if(!this.data.creator) {
      invalids.push('creator');
    }
  }

  // ensure creation date is valid
  if(properties.indexOf('date') > -1) {
    if(!this.data.date || !Number(this.data.date) > 0) {
      invalids.push('date');
    }
  }

  // if parent id is not specified, make this a root branch
  if(properties.indexOf('parentid') > -1) {
    if(!this.data.parentid) {
      this.data.parentid = 'root';
    } else {
      // ...ensure it is of the correct length
      if(this.data.parentid.length < 1 || this.data.parentid.length > 20) {
        invalids.push('parentid');
      }
      // ...and contains no whitespace
      if(/\s/g.test(this.data.parentid)) {
        invalids.push('parentid');
      }
    }
  }

  // ensure description is of valid length
  if(properties.indexOf('description') > -1) {
    if(!this.data.description || this.data.description.length > 250 || this.data.description.length < 1) {
      invalids.push('description');
    }
  }

  // ensure rules text is of valid length
  if(properties.indexOf('rules') > -1) {
    if(!this.data.rules || this.data.rules.length > 250 || this.data.rules.length < 1) {
      invalids.push('rules');
    }
  }

  return invalids;
};

// Get a user by their username from the db, and
// instantiate the object with this data.
// Rejects promise with true if database error, with false if no user found.
Branch.prototype.findById = function(id) {
  var self = this;
  return new Promise(function(resolve, reject) {
    aws.dbClient.get({
      TableName: self.config.table,
      Key: {
        'id': id
      }
    }, function(err, data) {
      if(err) return reject(err);
      if(!data || !data.Item) {
        return reject();
      }
      self.data = data.Item;
      return resolve();
    });
  });
};

// Get root branches using the GSI 'parentid', which will be set to 'root'.
// TODO: this has an upper limit on the number of results; if so, a LastEvaluatedKey
// will be supplied to indicate where to continue the search from
// (see: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#query-property)
Branch.prototype.findSubbranches = function(parentid) {
  var self = this;
  return new Promise(function(resolve, reject) {
    aws.dbClient.query({
      TableName: self.config.table,
      IndexName: self.config.keys.secondary.global,
      Select: 'ALL_ATTRIBUTES',
      KeyConditionExpression: "parentid = :parentid",
      ExpressionAttributeValues: {
          ":parentid": parentid
      }
    }, function(err, data) {
      if(err) return reject(err);
      if(!data || !data.Items) {
        return reject();
      }
      return resolve(data.Items);
    });
  });
}

module.exports = Branch;