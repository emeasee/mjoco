/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Cover = require('../api/vital/vital.model');
var Project = require('../api/project/project.model');

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
    project_id: '1',
    project_url: 'ajoto',
    project_client: 'testers',
    project_title: 'Image Test #1',
    project_text: 'Some project text',
    project_year: '2015',
    project_template: 'cycle auto fast',
    project_templates: {
      cycle: true,
      auto: true,
      fast: true
    },
    project_collaborator: 'Someone',
    project_external_url: 'www.google.com',
    project_tags: ['featured','user_interface'],
    project_colour: 'charcoal',
    project_background: 'off-white',
    project_assets: [{
      asset_id : '01',
      asset_width : '2800',
      asset_height : '1800',
      asset_format : 'jpg',
      asset_type : 'image',
      asset_flag : '0'
    },{
        asset_id : '02',
        asset_width : '2800',
        asset_height : '1800',
        asset_format : 'jpg',
        asset_type : 'image',
        asset_flag : '0'
    },{
      asset_id : '03',
      asset_width : '2800',
      asset_height : '1800',
      asset_format : 'jpg',
      asset_type : 'image',
      asset_flag : '0'
    }],
    project_long_title: 'Image Test #1 Long Title',
    project_tags_human: [{
      url : 'user_interface',
      text : 'User Interface'
    },{
      url : 'featured',
      text : 'Featured'
    }],
    project_disciplines_human: [{
      url : 'user_interface',
      text : 'User Interface'
    }],
    project_sectors_human: [{
      url : 'technology',
      text : 'Technology'
    }],
    project_sections: [{
      section_type : 'section',
      section_url : 'top',
      section_title : 'top',
      section_assets : [{
        asset_id : '01',
        asset_width : '2800',
        asset_height : '1800',
        asset_format : 'jpg',
        asset_type : 'image',
        asset_flag : '0'
      },{
        asset_id : '02',
        asset_width : '2800',
        asset_height : '1800',
        asset_format : 'jpg',
        asset_type : 'image',
        asset_flag : '0'
      },{
        asset_id : '03',
        asset_width : '2800',
        asset_height : '1800',
        asset_format : 'jpg',
        asset_type : 'image',
        asset_flag : '0'
      }],
      section_text : '',
      section_template : 'cycle fast',
      section_show_title : false,
      section_iframe_url : null,
      section_ratio : 1,
      section_templates : {
        cycle : true,
        fast : true
      }
    }]
  },
    {
      project_id: '2',
      project_url: 'urbaniso',
      project_client: 'testers',
      project_title: 'Video Test #1',
      project_text: 'Some project text',
      project_year: '2015',
      project_template: 'cycle auto fast',
      project_templates: {
        cycle: true,
        auto: true,
        fast: true
      },
      project_collaborator: 'Someone',
      project_external_url: 'www.google.com',
      project_tags: ['featured','interaction'],
      project_colour: 'black',
      project_background: 'off-white',
      project_assets: [{
        asset_id : '01',
        asset_width : '1200',
        asset_height : '800',
        asset_format : 'jpg',
        asset_type : 'image',
        asset_flag : false
      },{
        asset_id : '02',
        asset_width : '1200',
        asset_height : '800',
        asset_format : 'jpg',
        asset_type : 'image',
        asset_flag : false
      },{
        asset_id : '03',
        asset_width : '1200',
        asset_height : '800',
        asset_format : 'jpg',
        asset_type : 'image',
        asset_flag : false
      }],
      project_long_title: 'Video Test #1 Long Title',
      project_tags_human: [{
        url : 'interaction',
        text : 'Interaction'
      },{
        url : 'featured',
        text : 'Featured'
      }],
      project_disciplines_human: [{
        url : 'design',
        text : 'Design'
      }],
      project_sectors_human: [{
        url : 'technology',
        text : 'Technology'
      }],
      project_sections: [{
        section_type : 'section',
        section_url : 'hero',
        section_title : 'hero',
        section_assets : [{
          asset_id : '01',
          asset_width : '2800',
          asset_height : '1800',
          asset_format : 'jpg',
          asset_type : 'image',
          asset_flag : false
        },{
          asset_id : '02',
          asset_width : '2800',
          asset_height : '1800',
          asset_format : 'jpg',
          asset_type : 'image',
          asset_flag : false
        }],
        section_text : null,
        section_template : "cycle fade",
        section_show_title : false,
        section_iframe_url : null,
        section_ratio : 1,
        section_templates : {
          cycle : true,
          fast : true
        }
      }]
    });

});
