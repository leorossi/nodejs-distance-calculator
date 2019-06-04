'use strict';

const ClosestLocationFinder = function ClosestLocationFinder({}) {

}

ClosestLocationFinder.prototype.getFor = function(distanceMatrix) {
  const output = distanceMatrix.map((row) => {
    return row.indexOf(Math.min.apply(null, row.filter((element) => element !== null)));
  });
  return output;
}

module.exports = ClosestLocationFinder;