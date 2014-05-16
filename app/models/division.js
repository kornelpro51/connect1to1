/*jslint node: true */
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  config = require('../../config/config'),
  InstanceSchema = require('./instance'),
  Schema = mongoose.Schema;

/**
 * Condition Schema
 */
var DivisionSchema = new Schema({
  address: {
    type: String,
    'default': '',
    trim: true
  },
  name: {
    type: String,
    'default': '',
    trim: true
  },
  conditions: [{
    type: Schema.ObjectId,
    ref: 'Condition'
  }],
  procedures: [{
    type: Schema.ObjectId,
    ref: 'Procedure'
  }],
  instances: [InstanceSchema]
});

/**
 * Validations
 */
DivisionSchema.path('name').validate(function (name) {
  "use strict";

  return name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */
DivisionSchema.statics = {
  load: function (id, cb) {
    "use strict";

    this.findOne({ _id: id })
      .populate('conditions')
      .populate('procedures')
      .exec(cb);
  }
};

mongoose.model('Division', DivisionSchema);
