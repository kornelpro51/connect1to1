/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Attribute = mongoose.model('Attribute'),
    _ = require('underscore');


/**
 * Find attribute by id
 */
exports.attribute = function(req, res, next, id) {
    Attribute.load(id, function(err, attribute) {
        if (err) return next(err);
        if (!attribute) return next(new Error('Failed to load attribute ' + id));
        req.attribute = attribute;
        next();
    });
};

/**
 * Create a attribute
 */
exports.create = function(req, res) {
    var attribute = new Attribute(req.body);
    attribute.user = req.user;

    attribute.save(function(err) {
        if (err) {
          res.send(400, err);
        } else {
          res.send(200, attribute);
        }
    });
};

/**
 * Update a attribute
 */
exports.update = function(req, res) {
    var attribute = req.attribute;

    attribute = _.extend(attribute, req.body);

    attribute.save(function(err) {
        res.jsonp(attribute);
    });
};

/**
 * Delete an attribute
 */
exports.destroy = function(req, res) {
    var attribute = req.attribute;

    attribute.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(attribute);
        }
    });
};

/**
 * Show an attribute
 */
exports.show = function(req, res) {
    res.jsonp(req.attribute);
};

/**
 * List of Attributes
 */
exports.all = function(req, res) {
    Attribute.find().sort('-created').populate('user', 'name username').exec(function(err, attributes) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(attributes);
        }
    });
};
/**
 * Show an attribute
 */
exports.dcdata = function(req, res) {
  if(typeof req.body.type == 'undefined' || req.body.type == 'all') {
    Attribute.find({section: 'demographic'}, function(err, dmgAttributes){
      if(err) {
        res.jsonp({err: 1, msg: 'can not access data from db. demographic access error.'});
      } else {
        Attribute.find({section: 'clinical'}, function(err, clcAttributes){
          if(err) {
            res.jsonp({err: 1, msg: 'can not access data from db. clinical access error.'});
          } else {
            res.jsonp({
              err: 0,
              data: {
                dmg: dmgAttributes,
                clc: clcAttributes
              }
            });
          }
        });
      }
    });
  } else if(req.body.type == 'clinical' || req.body.type == 'demographic' ) {
    Attribute.find({section: req.body.type}, function(err, attributes){
      if(err) {
        res.jsonp({err: 1, msg: 'can not access data from db.'});
      } else {
        res.jsonp({err: 0, data: attributes});
      }
    });
  } else {
    res.jsonp({err: 1, msg: 'request parameter error'});
  }

};
