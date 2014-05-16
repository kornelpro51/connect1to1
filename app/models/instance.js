/*jslint node: true */
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  config = require('../../config/config'),
  Schema = mongoose.Schema;

/**
 * Condition Schema
 */
var InstanceSchema = new Schema({
  conditions: [{
    type: Schema.ObjectId,
    ref: 'Condition'
  }],
  name: {
    type: String,
    'default': '',
    trim: true
  },
  primaryUser: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  procedures: [{
    type: Schema.ObjectId,
    ref: 'Procedure'
  }],
  tagline: {
    type: String,
    'default': '',
    trim: true
  },
  urlCode: {
    type: String,
    'default': '',
    trim: true
  },
  users: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  welcomeEmailText: {
    type: String,
    'default': '',
    trim: true
  }
});

/**
 * Validations
 */
InstanceSchema.path('conditions').validate(function (conditions) {
  "use strict";

  return conditions.length;
}, 'At least one condition has to be set');

InstanceSchema.path('name').validate(function (name) {
  "use strict";

  return name.length;
}, 'Name cannot be blank');

InstanceSchema.path('procedures').validate(function (procedures) {
  "use strict";

  return procedures.length;
}, 'At least one procedure has to be set');

/**
 * Statics
 */
InstanceSchema.statics = {
  load: function (id, cb) {
    "use strict";

    this.findOne({ _id: id })
      .populate('conditions')
      .populate('procedures')
      .populate('primaryUser')
      .populate('users')
      .exec(cb);
  }
};

mongoose.model('Instance', InstanceSchema);
