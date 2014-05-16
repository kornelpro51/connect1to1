/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    PatientScheduleSchema = require('./patientSchedule').schema,
    crypto = require('crypto');

var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;


/**
 * Attribute Schema
 */
var PatientSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User', default: null},
    name: {
        type: String,
        default: '',
        trim: true
    },
    email: {
        type: String,
        default: '',
        trim: true
    },
    birthdate: {
        type: String,
        default: '',
        trim: true
    },
    phone: {
        type: String,
        default: '',
        trim: true
    },
    gender: {type: String, enum: [ 'Male', 'Female']},
    clinicalId: {
        type: Schema.ObjectId,
        ref: 'Attribute'
    },
    demographicId: {
        type: Schema.ObjectId,
        ref: 'Attribute'
    },
    activateKey: {
        type: String,
        default: '',
        trim: true
    },
    activated: {
        type: Boolean,
        default: false
    },
    schedules: [PatientScheduleSchema]
});

/**
 * Validations
 */
PatientSchema.pre('save', function (next) {
    var self = this;
    if ( self.activateKey === '' ) {
      self.generateActiveKey(function( key ){
        self.activateKey = key;
      });
    }
    next();
});

PatientSchema.methods.generateActiveKey = function(cb) {
    var timepiece = Math.round((new Date().valueOf() * Math.random())) + '';
    cb(crypto.createHmac('sha1', timepiece).update(this.name).digest('hex'));
};

PatientSchema.methods.hasUser = function(cb) {
    var patient = this;
    if (patient._user === null)
        return false;
    return true;
};


module.exports = mongoose.model('Patient', PatientSchema);
