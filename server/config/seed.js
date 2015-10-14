/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Cover = require('../api/vital/vital.model');
var Project = require('../api/project/project.model');
var User = require('../api/user/user.model');

Cover.find({}).remove(function() {
  Cover.create({
    name : 'Heart',
    url : 'heart',
    data_url: '\/assets\/vitals\/heart\/',
    data_requirements: ['webgl'],
    data_colour: 'black',
    data_background: 'white'
  });
});

Project.find({}).remove(function() {
  Project.create({
    project_id: '01',
    project_url: 'fieldlogs',
    project_client: 'Trekea SAS',
    project_title: 'FieldLogs',
    project_text: 'Standardize Work & Real-Time Field Data Capture',
    project_year: '2014',
    project_template: 'cycle auto fast',
    project_templates: {
      cycle: true,
      auto: true,
      fade: false,
      fast: true,
      fill: false
    },
    project_collaborator: null,
    project_external_url: 'www.fieldlogs.com',
    project_tags: ['featured','user_interface'],
    project_colour: 'charcoal',
    project_background: 'off-white',
    project_assets: [{
      asset_id : 'fieldlogs-01',
      asset_width : '2800',
      asset_height : '1800',
      asset_format : 'jpg',
      asset_type : 'image',
      asset_flag : false
    },{
        asset_id : 'fieldlogs-02',
        asset_width : '2800',
        asset_height : '1800',
        asset_format : 'jpg',
        asset_type : 'image',
        asset_flag : false
    },{
      asset_id : 'fieldlogs-03',
      asset_width : '2800',
      asset_height : '1800',
      asset_format : 'jpg',
      asset_type : 'image',
      asset_flag : false
    }],
    project_long_title: 'Standardize Work & Real-Time Field Data Capture',
    project_tags_human: [{
      url : 'user_interface',
      text : 'User Interface'
    },{
      url : 'featured',
      text : 'Featured'
    }],
    project_disciplines_human: [{
      url : 'web',
      text : 'Web'
    },{
      url : 'mobile',
      text : 'Mobile'
    }],
    project_sectors_human: [{
      url : 'enterprise',
      text : 'Enterprise'
    }],
    project_sections: [{
      section_type : 'section',
      section_url : 'top',
      section_title : 'top',
      section_assets : [{
        asset_id : 'fieldlogs-01',
        asset_width : '2800',
        asset_height : '1800',
        asset_format : 'jpg',
        asset_type : 'image',
        asset_flag : false
      },{
        asset_id : 'fieldlogs-02',
        asset_width : '2800',
        asset_height : '1800',
        asset_format : 'jpg',
        asset_type : 'image',
        asset_flag : false
      },{
        asset_id : 'fieldlogs-03',
        asset_width : '2800',
        asset_height : '1800',
        asset_format : 'jpg',
        asset_type : 'image',
        asset_flag : false
      },{
        asset_id : 'fieldlogs-04',
        asset_width : '2800',
        asset_height : '1800',
        asset_format : 'jpg',
        asset_type : 'image',
        asset_flag : false
      }],
      section_text : '',
      section_template : 'cycle auto',
      section_show_title : false,
      section_iframe_url : null,
      section_assets_count : 4,
      section_ratio : 1,
      section_templates : {
        cycle : true,
        fast : false,
        auto: true,
        fill: false,
        fade: false
      }
    },{
        section_type : 'section',
        section_url : 'moreimages',
        section_title : 'more images',
        section_assets : [{
          asset_id : 'fieldlogs-05',
          asset_width : '2800',
          asset_height : '1800',
          asset_format : 'jpg',
          asset_type : 'image',
          asset_flag : false
        }],
        section_text : null,
        section_template : null,
        section_assets_count : 1,
        section_show_title : false,
        section_iframe_url : null,
        section_ratio : 1,
        section_templates : {
          cycle : false,
          fast : false,
          auto: false,
          fill: false,
          fade: false
        }
      },{
      section_type : 'section',
      section_url : 'moreimages',
      section_title : 'more images',
      section_assets : [{
        asset_id : 'fieldlogs-06',
        asset_width : '2800',
        asset_height : '1800',
        asset_format : 'jpg',
        asset_type : 'image',
        asset_flag : false
      }],
      section_text : null,
      section_template : null,
      section_assets_count : 1,
      section_show_title : false,
      section_iframe_url : null,
      section_ratio : 1,
      section_templates : {
        cycle : false,
        fast : false,
        auto: false,
        fill: false,
        fade: false
      }
    },{
      section_type : 'section',
      section_url : 'moreimages',
      section_title : 'more images',
      section_assets : [{
        asset_id : 'fieldlogs-07',
        asset_width : '2800',
        asset_height : '1800',
        asset_format : 'jpg',
        asset_type : 'image',
        asset_flag : false
      }],
      section_text : null,
      section_template : null,
      section_assets_count : 1,
      section_show_title : false,
      section_iframe_url : null,
      section_ratio : 1,
      section_templates : {
        cycle : false,
        fast : false,
        auto: false,
        fill: false,
        fade: false
      }
    },{
      section_type : 'section',
      section_url : 'text',
      section_title : 'text',
      section_assets : [],
      section_text : '<p>FieldLogs is multi-device software eco-system enabling on-site work evidencing, real-time collaboration between field workers and colleagues and instructional guidance for highly technical procedures or anything requiring a start-end flow. <br><br>I was responsible for the interface and UX from designing static mockups right through to working HTML/CSS/JS templates and styleguides.</p>',
      section_template : null,
      section_assets_count : 1,
      section_show_title : true,
      section_iframe_url : null,
      section_ratio : 1,
      section_templates : {
        cycle : false,
        fast : false,
        auto: false,
        fill: false,
        fade: false
      }
    }]
  });

});

User.find({}).remove(function() {
  User.create({
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    }, function() {
      console.log('finished populating users');
    }
  );
});
