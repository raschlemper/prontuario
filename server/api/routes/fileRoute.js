'use strict'

var config = require('../../config/environment');
var fileController = require(config.resources.controllers + '/fileController');
var express = require('express');
var router = express.Router();

/**
 * /api/file
 */

router.post('/patient', fileController.patient, fileController.sendResult);

module.exports = router;
