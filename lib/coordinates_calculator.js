'use strict';

const CoordinatesCalculator = function CoordinatesCalculator(Geocoder) {
  this.geocoder = Geocoder;
}
CoordinatesCalculator.prototype.get = function(location) {
  return new Promise((resolve, reject) => {
    if (location.latitude && location.longitude) {
      
      return resolve({
        latitude: location.latitude,
        longitude: location.longitude
      });
    } else if (location.address) {
      return this.geocoder.translate(location.address).then(resolve).catch(reject);
    } else {
      // use location name
      return this.geocoder.translate(location.name).then(resolve).catch(reject);
    }
  }); 
}
module.exports = CoordinatesCalculator;