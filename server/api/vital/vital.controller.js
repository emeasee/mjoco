'use strict';

var _ = require('lodash');
var Vital = require('./vital.model');

// Get list of vitals
exports.index = function(req, res) {
  Vital.find(function (err, vitals) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(vitals);
  });
};

// Get a single vital
exports.show = function(req, res) {
  Vital.findById(req.params.id, function (err, vital) {
    if(err) { return handleError(res, err); }
    if(!vital) { return res.status(404).send('Not Found'); }
    return res.json(vital);
  });
};

// Creates a new vital in the DB.
exports.create = function(req, res) {
  Vital.create(req.body, function(err, vital) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(vital);
  });
};

// Updates an existing vital in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Vital.findById(req.params.id, function (err, vital) {
    if (err) { return handleError(res, err); }
    if(!vital) { return res.status(404).send('Not Found'); }
    var updated = _.merge(vital, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(vital);
    });
  });
};

// Deletes a vital from the DB.
exports.destroy = function(req, res) {
  Vital.findById(req.params.id, function (err, vital) {
    if(err) { return handleError(res, err); }
    if(!vital) { return res.status(404).send('Not Found'); }
    vital.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}