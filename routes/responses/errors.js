/* Module to send error responses to the client */
'use strict';

module.exports.BadRequest = function(res) {
  res.statusCode = 400;
  var error = {};
  error.message = 'The server could not process the request';
  res.send(error);
};

module.exports.Forbidden = function(res) {
  res.statusCode = 403;
  var error = {};
  error.message = 'Access denied';
  res.send(error);
};

module.exports.NotFound = function(res, message) {
  res.statusCode = 404;
  var error = {};
  error.message = 'The requested resource couldn\'t be found';
  res.send(error);
};

module.exports.InternalServerError = function(res, message) {
  res.statusCode = 500;
  var error = {};
  error.message = 'Something went wrong. We\'re looking into it.';
  res.send(error);
};