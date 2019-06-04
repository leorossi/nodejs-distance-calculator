'use strict';

const LocationSanitizer = function LocationSanitizer({ coordinatesCalculator }) {
  this._coordinatesCalculator = coordinatesCalculator;
};

LocationSanitizer.prototype.sanitizeArray = function(locations) {
  return new Promise((resolve, reject) => {
    const promises = locations.map((loc) => {
      return this.sanitizeLocation(loc);
    });
    Promise.all(promises)
      .then((results) => {
        // Filter out null values first
        return resolve(results.filter((res) => {
          return res !== null;
        }));
      })
      .catch(reject);
  });
  
};

LocationSanitizer.prototype.sanitizeLocation = function(location) {
  return new Promise((resolve, reject) => {
    const returnObject = {
      name: location.name
    };
    // If location has address but no name, use the address as name
    // The geocoder should be able to translate it.
    if (location.address && !location.name) {
      returnObject.name = location.address;
    }

    const fromLatLonFields = this._getLatLngFields(location);
    if (fromLatLonFields) {
      returnObject.latitude = fromLatLonFields.latitude;
      returnObject.longitude = fromLatLonFields.longitude;
      return resolve(returnObject);
    } else {
      return this._coordinatesCalculator.get(location)
        .then((fromGeocoder) => {
          if (fromGeocoder == null) {
            // not a valid location
            return resolve(null);
          } else {
            returnObject.latitude = fromGeocoder.latitude;
            returnObject.longitude = fromGeocoder.longitude;
            return resolve(returnObject);
          }
        })
        .catch(reject);
    }
  });
}

LocationSanitizer.prototype._getLatLngFields = function(location) {
 
  if (location.latitude && location.longitude) {
    return {
      latitude: location.latitude,
      longitude: location.longitude,
    }
  }

  if (location.lat && location.lng) {
    return {
      latitude: location.lat,
      longitude: location.lng,
    }
  }

  if (location.lat && location.lon) {
    return {
      latitude: location.lat,
      longitude: location.lon,
    }
  }

  return null;
}

module.exports = LocationSanitizer;