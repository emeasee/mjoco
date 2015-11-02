'use strict';

var express = require('express');
var controller = require('./project.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.filter);
router.get('/all', controller.index);
router.get('/:url', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:url', auth.hasRole('admin'), controller.update);
router.patch('/:url', auth.hasRole('admin'), controller.update);
router.delete('/:url', auth.hasRole('admin'), controller.destroy);

module.exports = router;
