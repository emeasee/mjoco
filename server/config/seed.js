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

  });

});
