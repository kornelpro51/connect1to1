/*jslint node: true */
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  async = require('async'),
  Procedure = mongoose.model('Procedure'),
  _ = require('underscore');


/**
 * Find procedure by id
 */
exports.procedure = function (req, res, next, id) {
  "use strict";

  Procedure.load(id, function (err, procedure) {
    if (err) {
      return next(err);
    }
    if (!procedure) {
      return next(new Error('Failed to load procedure ' + id));
    }
    req.procedure = procedure;
    next();
  });
};

/**
 * Create a procedure
 */
exports.create = function(req, res) {
  "use strict";

  var procedure = new Procedure(req.body);

  procedure.save(function(err) {
    if (err) {
      res.send(400, err);
    } else {
      res.send(200, procedure);
    }
  });
};

/**
 * Update a procedure
 */
exports.update = function(req, res) {
  "use strict";

  var procedure = req.procedure;

  procedure = _.extend(procedure, req.body);

  procedure.save(function() {
    res.jsonp(procedure);
  });
};

/**
 * Delete an procedure
 */
exports.destroy = function(req, res) {
  "use strict";

  var procedure = req.procedure;

  procedure.remove(function(err) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(procedure);
    }
  });
};

/**
 * Show an procedure
 */
exports.show = function(req, res) {
  "use strict";

  res.jsonp(req.procedure);
};

/**
 * List of Procedures
 */
exports.all = function(req, res) {
  "use strict";

  Procedure
    .find()
    .sort('name')
    .populate('attributes')
    .exec(function(err, procedures) {
      if (err) {
        res.render('error', {
          status: 500
        });
      } else {
        res.jsonp(procedures);
      }
    });
};
