'use strict';

var _ = require('lodash');
var Project = require('./project.model');

// Get list of projects
exports.index = function(req, res) {
  Project.find({ project_tags : req.query.tags }, function (err, projects) {
    if(err) { return handleError(res, err); }
    var resTags = null;
    var humanTag;

    if (typeof projects !== 'undefined' && projects.length > 0){
      projects[0]._doc.project_tags_human.forEach(function (x, i){
        if (x.url === req.query.tags){
          humanTag = x.text;
        }
      });
      resTags = req.query.tags !== undefined ? humanTag : 'Archive';
      projects.forEach (function(project, index) {
        delete projects[index]._doc.project_sections;
      });
    }
    return res.status(200).json({tags: [resTags], projects: projects});
  });
};

// Get a single project
exports.show = function(req, res) {
  Project.find({ project_url : req.params.url }, function (err, project) {
    if(err) { return handleError(res, err); }
    if(!project) { return res.status(404).send('Not Found'); }
    return res.json(project);
  });
};

// Creates a new project in the DB.
exports.create = function(req, res) {
  Project.create(req.body, function(err, project) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(project);
  });
};

// Updates an existing project in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Project.findOne({ project_url : req.params.url }, function (err, project) {
    if (err) { return handleError(res, err); }
    if(!project) { return res.status(404).send('Not Found'); }
    var updated = _.merge(project, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(project);
    });
  });
};

// Deletes a project from the DB.
exports.destroy = function(req, res) {
  Project.findOne({ project_url : req.params.url }, function (err, project) {
    if(err) { return handleError(res, err); }
    if(!project) { return res.status(404).send('Not Found'); }
    project.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
