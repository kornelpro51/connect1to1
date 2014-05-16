/*jslint node: true */
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  async = require('async'),
  Instance = mongoose.model('Instance'),
  _ = require('underscore');


/**
 * Find instance by id
 */
exports.instance = function (req, res, next, id) {
  "use strict";

  Instance.load(id, function (err, instance) {
    if (err) {
      return next(err);
    }
    if (!instance) {
      return next(new Error('Failed to load instance ' + id));
    }
    req.instance = instance;
    next();
  });
};

/**
 * Create a instance
 */
exports.create = function (req, res) {
  "use strict";

  var instance = new Instance(req.body);

  instance.save(function (err) {
    if (err) {
      res.send(400, err);
    } else {
      res.send(200, instance);
    }
  });
};

/**
 * Update a instance
 */
exports.update = function (req, res) {
  "use strict";

  var instance = req.instance;

  instance = _.extend(instance, req.body);

  instance.save(function () {
    res.jsonp(instance);
  });
};

/**
 * Delete an instance
 */
exports.destroy = function (req, res) {
  "use strict";

  var instance = req.instance;

  instance.remove(function (err) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(instance);
    }
  });
};

/**
 * Show an instance
 */
exports.show = function (req, res) {
  "use strict";

  res.jsonp(req.instance);
};

/**
 * List of Instances
 */
exports.all = function (req, res) {
  "use strict";

  Instance.find()
    .sort('name')
    .populate('conditions')
    .populate('division')
    .populate('organization')
    .populate('procedures')
    .populate('primaryUser')
    .populate('users')
    .exec(function (err, instances) {
      if (err) {
        res.render('error', {
          status: 500
        });
      } else {
        res.jsonp(instances);
      }
    });
};
