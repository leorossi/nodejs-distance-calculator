'use strict';
const awilix = require('awilix');

const Config = require('./config');
const CoordinatesCalculator = require('./coordinates_calculator');
const DistanceMatrixCalculator = require('./distance_matrix_calculator');
const Geocoder = require('./geocoder');
const LocationSanitizer = require('./locations_sanitizer');
const Server = require('./server');

const container = awilix.createContainer();

container.register({
  config: awilix.asValue(Config),
  coordinatesCalculator: awilix.asClass(CoordinatesCalculator),
  distanceMatrixCalculator: awilix.asClass(DistanceMatrixCalculator),
  LocationSanitizer: awilix.asClass(LocationSanitizer),
  geocoder: awilix.asClass(Geocoder),
  server: awilix.asClass(Server),
  
  
});


module.exports = container;
