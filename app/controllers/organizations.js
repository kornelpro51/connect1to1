/*jslint node: true */
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  async = require('async'),
  Organization = mongoose.model('Organization'),
  Division = mongoose.model('Division'),
  User = mongoose.model('User'),
  _ = require('underscore');


function convertPostData(reqBody) {
  reqBody.users = reqBody.users.map(function(user) {
    return user._id;
  });

  reqBody.primaryUser = _.isObject(reqBody.primaryUser) ? reqBody.primaryUser._id : reqBody.primaryUser;

  return reqBody;
}

/**
 * Find organization by id
 */
exports.organization = function (req, res, next, id) {
  "use strict";

  Organization.load(id, function (err, organization) {
    if (err) {
      return next(err);
    }
    if (!organization) {
      return next(new Error('Failed to load organization ' + id));
    }
    req.organization = organization;
    next();
  });
};

/**
 * Creates an organization
 */
exports.create = function (req, res) {
  "use strict";

  var organization = new Organization(convertPostData(req.body));

  organization.save(function (err) {
    if (err) {
      res.send(400, err);
    } else {
      res.send(200, organization);
    }
  });
};

/**
 * Updates an organization.
 */
exports.update = function (req, res) {
  "use strict";

  var organization = _.extend(req.organization, convertPostData(req.body));

  organization.save(function (err) {
    res.jsonp(organization);
  });
};

/**
 * Deletes an organization
 */
exports.destroy = function (req, res) {
  "use strict";

  var organization = req.organization;

  organization.remove(function (err) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(organization);
    }
  });
};

/**
 * Shows an organization
 */
exports.show = function (req, res) {
  "use strict";

  res.jsonp(req.organization);
};

/**
 * Lists Organizations
 */
exports.all = function (req, res) {
  "use strict";

  Organization.find()
    .sort('-name')
    .populate('primaryUser')
    .exec(function (err, organizations) {
      if (err) {
        res.render('error', { status: 500 });
      } else {
        res.jsonp(organizations);
      }
    });
};
