/*jslint node: true */
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  async = require('async'),
  Condition = mongoose.model('Condition'),
  _ = require('underscore');


/**
 * Find condition by id
 */
exports.condition = function (req, res, next, id) {
  "use strict";

  Condition.load(id, function (err, condition) {
    if (err) {
      return next(err);
    }
    if (!condition) {
      return next(new Error('Failed to load condition ' + id));
    }
    req.condition = condition;
    next();
  });
};

/**
 * Create a condition
 */
exports.create = function (req, res) {
  "use strict";

  var condition = new Condition(req.body);

  condition.save(function (err) {
    if (err) {
      res.send(400, err);
    } else {
      res.send(200, condition);
    }
  });
};

/**
 * Update a condition
 */
exports.update = function (req, res) {
  "use strict";

  var condition = req.condition;

  condition = _.extend(condition, req.body);

  condition.save(function () {
    res.jsonp(condition);
  });
};

/**
 * Delete an condition
 */
exports.destroy = function (req, res) {
  "use strict";

  var condition = req.condition;

  condition.remove(function (err) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(condition);
    }
  });
};

/**
 * Show an condition
 */
exports.show = function (req, res) {
  "use strict";

  res.jsonp(req.condition);
};

/**
 * List of Conditions
 */
exports.all = function (req, res) {
  "use strict";

  Condition.find()
    .sort('name')
    .populate('attributes')
    .exec(function (err, conditions) {
      if (err) {
        res.render('error', {
          status: 500
        });
      } else {
        res.jsonp(conditions);
      }
    });
};
