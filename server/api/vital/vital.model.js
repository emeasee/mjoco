'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VitalSchema = new Schema({
    name: String,
    url: String,
    data_url: String,
    data_requirements: [String],
    data_colour: String,
    data_background: String
});

module.exports = mongoose.model('Vital', VitalSchema);
