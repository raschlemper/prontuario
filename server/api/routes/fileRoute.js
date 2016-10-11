'use strict'

var config = require('../../config/environment');
var fileController = require(config.resources.controllers + '/fileController');
var express = require('express');
var router = express.Router();

/**
 * /api/file
 */
router.get('/patient/:name', fileController.findPatient);
router.post('/patient', fileController.savePatient);

module.exports = router;
