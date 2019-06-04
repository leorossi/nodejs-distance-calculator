'use strict';
const geolib = require('geolib');
const DistanceMatrixCalculator = function DistanceMatrixCalculator() {
  this.geolib = geolib;
}

DistanceMatrixCalculator.prototype.calculateFor = function(locations) {
  const distances = [];
  for (let sourceIndex = 0; sourceIndex < locations.length; sourceIndex++) {
    distances[sourceIndex] = Array(locations.length).fill(null);
    const otherLocations = locations.slice(sourceIndex + 1);
    for (let targetIndex = 0; targetIndex < locations.length; targetIndex++) {
      if (targetIndex < sourceIndex) {
        distances[sourceIndex][targetIndex] = distances[targetIndex][sourceIndex];
      } else if (targetIndex == sourceIndex) {
        // do nothing
      } else {
        distances[sourceIndex][targetIndex] = this.geolib.getDistance(locations[sourceIndex], locations[targetIndex]);
      }
    }
  }
  return distances;
}

module.exports = DistanceMatrixCalculator;