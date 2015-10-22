'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  project_id: String,
  project_url: String,
  project_client: String,
  project_title: String,
  project_text: String,
  project_year: String,
  project_collaborator: String,
  project_templates: {
    cycle: Boolean,
    auto: Boolean,
    fade: Boolean,
    fast: Boolean,
    fill: Boolean
  },
  project_external_url: String,
  project_tags: [String],
  project_colour: String,
  project_background: String,
  project_assets: [{
    asset_id : String,
    asset_width : String,
    asset_height : String,
    asset_format : String,
    asset_type : String,
    asset_flag : Boolean
  }],
  project_long_title: String,
  project_tags_human: [{
    url : String,
    text : String
  }],
  project_disciplines_human: [{
    url : String,
    text : String
  }],
  project_sectors_human: [{
    url : String,
    text : String
  }],
  project_sections: [{
    section_type : String,
    section_url : String,
    section_title : String,
    section_assets : [{
      asset_id : String,
      asset_width : String,
      asset_height : String,
      asset_format : String,
      asset_type : String,
      asset_flag : Boolean,
      asset_vimeo : String
    }],
    section_text : String,
    section_template : String,
    section_tags : String,
    section_show_title : Boolean,
    section_iframe_url : String,
    section_ratio : Number,
    section_assets_count : Number,
    section_templates : {
      cycle : Boolean,
      fast : Boolean,
      fill: Boolean,
      fade: Boolean,
      auto : Boolean
    }
  }]
});

module.exports = mongoose.model('Project', ProjectSchema);
