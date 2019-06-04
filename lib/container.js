'use strict';
const awilix = require('awilix');

const ClosestLocationFinder = require('./closest_location_finder');
const Config = require('./config');
const CoordinatesCalculator = require('./coordinates_calculator');
const DistanceMatrixCalculator = require('./distance_matrix_calculator');
const Geocoder = require('./geocoder');
const LocationSanitizer = require('./locations_sanitizer');
const Server = require('./server');

const container = awilix.createContainer();

container.register({
  closestLocationFinder: awilix.asClass(ClosestLocationFinder),
  config: awilix.asValue(Config),
  coordinatesCalculator: awilix.asClass(CoordinatesCalculator),
  distanceMatrixCalculator: awilix.asClass(DistanceMatrixCalculator),
  locationSanitizer: awilix.asClass(LocationSanitizer),
  geocoder: awilix.asClass(Geocoder),
  server: awilix.asClass(Server),
  
  
});


module.exports = container;
