'use strict'

var config = require('../../config/environment');
var patientController = require(config.resources.controllers + '/patientController');
var fileController = require(config.resources.controllers + '/fileController');
var express = require('express');
var router = express.Router();

/**
 * /api/patient
 */

router.get('/', patientController.findAll);

router.get('/:id', patientController.findById);

router.post('/', patientController.save);

router.put('/:id', patientController.update);

router.delete('/:id', patientController.remove);

module.exports = router;
