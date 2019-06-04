'use strict';
const googleMaps = require('@google/maps');


const Geocoder = function Geocoder({ config }) {
  if (!config('GOOGLE_GEOCODE_API_KEY')) {
    throw new Error('GOOGLE_GEOCODE_API_KEY env variable missing');
  }
  this.client = googleMaps.createClient({
    key: config('GOOGLE_GEOCODE_API_KEY'),
    Promise: Promise
  });
}
Geocoder.prototype.translate = function(address) {
  return new Promise((resolve, reject) => {
    
    this.client.geocode({ address: address })
      .asPromise()
      .then((response) => {
        if (response.status == 200) {
          const results = response.json.results;
          if (results.length > 0) {
            // take first result
            const output = {
              latitude: results[0].geometry.location.lat,
              longitude: results[0].geometry.location.lng
            };
            return resolve(output);
          } else {
            return resolve(null);
          }
        } else {
          throw new Error('bad response from Google Geocode API');
        }
      })
      .catch(reject);
  })
}
module.exports = Geocoder;