'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VitalSchema = new Schema({
    name: String,
    url: String,
    data_url: String,
    data_requirements: [String],
    data_colour: String,
    data_background: String,
    assets: [{
      asset_id : String,
      asset_width : String,
      asset_height : String,
      asset_format : String,
      asset_type : String,
      asset_flag : Boolean
    }]
});

module.exports = mongoose.model('Vital', VitalSchema);
