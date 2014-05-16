/*jslint node: true */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  config = require('../../config/config'),
  DivisionSchema = require('./division'),
  Schema = mongoose.Schema;

/**
 * Attribute Schema
 */
var OrganizationSchema = new Schema({
  address: {
    type: String,
    'default': '',
    trim: true
  },
  divisions: [DivisionSchema],
  name: {
    type: String,
    'default': '',
    trim: true
  },
  primaryUser: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  users: [{
    type: Schema.ObjectId,
    ref: 'User'
  }]
});

/**
 * Validations
 */
OrganizationSchema.path('name').validate(function (name) {
  "use strict";

  return name && name !== '';
}, 'Name cannot be blank');

OrganizationSchema.path('address').validate(function (address) {
  "use strict";

  return address && address !== '';
}, 'Address cannot be blank');

/**
 * Statics
 */
OrganizationSchema.statics = {
  load: function (id, cb) {
    "use strict";

    this.findOne({ _id: id })
      .populate('primaryUser')
      .populate('users')
      .exec(cb);
  }
};

mongoose.model('Organization', OrganizationSchema);
