/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Attribute Schema
 */
var PatientScheduleSchema = new Schema({
    title: String,
    start: Date,
    end: Date,
    allDay: Boolean,
    recursiveType: {type: String, enum: [ 'none', 'daily', ' weekly', 'monthly', 'yearly']},
    recursiveDate: Number,
    //recursiveWeek: { step: Number, weekday: {type: Array, enum: ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun']} },
    recursiveWeek: Number,
    recursiveMonth: Number,
    recursiveYear: Number,
    recursiveStart: Date,
    recursiveEnd: Date
});

PatientScheduleSchema.pre('save', function(next){
    this.start = new Date(this.start);
    this.end = new Date(this.end);
    this.recursiveStart = new Date(this.recursiveStart);
    this.recursiveEnd = new Date(this.recursiveEnd);
    next();
});

/**
 * Validations
 */


module.exports = mongoose.model('PatientSchedule', PatientScheduleSchema);
