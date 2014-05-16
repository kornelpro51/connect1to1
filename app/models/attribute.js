/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Attribute Schema
 */
var AttributeSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    section: {
        type: String,
        default: '',
        trim: true
    },
    type: {
        type: String,
        default: '',
        trim: true
    },
    values: {
        type: String,
        default: '',
        trim: true
    }
});

/**
 * Validations
 */
var sections = ['clinical', 'demographic'];
var types = ['text', 'num', 'select', 'multiselect'];

AttributeSchema.path('name').validate(function(name) {
    return name && name !== '';
}, 'Name cannot be blank');

AttributeSchema.path('section').validate(function(section) {
    return sections.indexOf(section) !== -1;
}, 'Section should be "' + sections.join('", "') + '"');

AttributeSchema.path('type').validate(function(type) {
    return types.indexOf(type) !== -1;
}, 'Type should be "' + types.join('", "') + '"');

/**
 * Statics
 */
AttributeSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user', 'name username').exec(cb);
    }
};

mongoose.model('Attribute', AttributeSchema);
