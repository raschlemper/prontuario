'use strict';

var path = require('path');
var _ = require('lodash');

// All Generics Configurations
// ============================================
var config = {
  root: path.normalize(__dirname + '/../../../'),
  resources: {
    routes: path.normalize(__dirname + '/../../../server/api/routes'),
    controllers: path.normalize(__dirname + '/../../../server/api/controllers'),
    services: path.normalize(__dirname + '/../../../server/api/services'),
    repositories: path.normalize(__dirname + '/../../../server/api/repositories'),
    models: path.normalize(__dirname + '/../../../server/api/models'),
    auth: path.normalize(__dirname + '/../../../server/auth'),
    errors: path.normalize(__dirname + '/../../../server/errors'),
    images: path.normalize(__dirname + '/../../../images')
  },
  port: process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
  ip: process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
};

module.exports = _.merge(config, require('./' + process.env.NODE_ENV + '.js') || {});
