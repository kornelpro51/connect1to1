/*jslint node: true */
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  async = require('async'),
  Division = mongoose.model('Division'),
  _ = require('underscore');


/**
 * Find division by id
 */
exports.division = function (req, res, next, id) {
  "use strict";

  Division.load(id, function (err, division) {
    if (err) {
      return next(err);
    }
    if (!division) {
      return next(new Error('Failed to load division ' + id));
    }
    req.division = division;
    next();
  });
};

/**
 * Create a division
 */
exports.create = function (req, res) {
  "use strict";

  var division = new Division(req.body);

  division.save(function (err) {
    if (err) {
      res.send(400, err);
    } else {
      res.send(200, division);
    }
  });
};

/**
 * Update a division
 */
exports.update = function (req, res) {
  "use strict";

  var division = _.extend(req.division, req.body);

  division.save(function () {
    res.jsonp(division);
  });
};

/**
 * Delete an division
 */
exports.destroy = function (req, res) {
  "use strict";

  var division = req.division;

  division.remove(function (err) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(division);
    }
  });
};

/**
 * Show an division
 */
exports.show = function (req, res) {
  "use strict";

  res.jsonp(req.division);
};

/**
 * List of Divisions
 */
exports.all = function (req, res) {
  "use strict";

  Division.find()
    .sort('name')
    .populate('conditions')
    .populate('instances')
    .populate('procedures')
    .exec(function (err, divisions) {
      if (err) {
        res.render('error', {
          status: 500
        });
      } else {
        res.jsonp(divisions);
      }
    });
};
