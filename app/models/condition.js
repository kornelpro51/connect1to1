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
var ConditionSchema = new Schema({
  name: {
    type: String,
    'default': '',
    trim: true
  },
  attributes: [{
    type: Schema.ObjectId,
    ref: 'Attribute'
  }]
});

/**
 * Validations
 */
ConditionSchema.path('name').validate(function (name) {
  "use strict";

  return name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */
ConditionSchema.statics = {
  load: function (id, cb) {
    "use strict";

    this.findOne({ _id: id })
      .populate('attributes')
      .exec(cb);
  }
};

mongoose.model('Condition', ConditionSchema);
