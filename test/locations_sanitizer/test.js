'use strict';

const expect = require('chai').expect;
const LocationSanitizer = require('../../lib/locations_sanitizer');
const TestUtils = require('../utils');

describe('Location Sanitizer', () => {
  it('should not call coordinates calculator for location with \'latitude\' and \'longitude\' fields', function(done) {
    const mockCoordinatesCalculator = {
      get: function() {
        return done(new Error('Coordinates Calculator should not be called'));
      }
    };
    const sanitizer = new LocationSanitizer({ coordinatesCalculator: mockCoordinatesCalculator});
    const mockLocation = {
      name: 'Awesome location',
      latitude: 37.3308337,
      longitude: -122.0096567,
    };

    sanitizer.sanitizeLocation(mockLocation)
      .then((data) => {
        expect(data).to.have.property('latitude');
        expect(data).to.have.property('longitude');
        expect(data.latitude).to.be.equal(mockLocation.latitude);
        expect(data.longitude).to.be.equal(mockLocation.longitude);
        return done();
      });
    
  });

  it('should not call coordinates calculator for location with \'lat\' and \'lng\' fields', function (done) {
    const mockCoordinatesCalculator = {
      get: function () {
        return done(new Error('Coordinates Calculator should not be called'));
      }
    };
    const sanitizer = new LocationSanitizer({ coordinatesCalculator: mockCoordinatesCalculator });
    const mockLocation = {
      name: 'Awesome location',
      lat: 37.3308337,
      lng: -122.0096567,
    };

    sanitizer.sanitizeLocation(mockLocation)
      .then((data) => {
        expect(data).to.have.property('latitude');
        expect(data).to.have.property('longitude');
        expect(data.latitude).to.be.equal(mockLocation.lat);
        expect(data.longitude).to.be.equal(mockLocation.lng);
        return done();
      });
  });
  it('should not call coordinates calculator for location with \'lat\' and \'lon\' fields', function (done) {
    const mockCoordinatesCalculator = {
      get: function () {
        return done(new Error('Coordinates Calculator should not be called'));
      }
    };
    const sanitizer = new LocationSanitizer({ coordinatesCalculator: mockCoordinatesCalculator });
    const mockLocation = {
      name: 'Awesome location',
      lat: 37.3308337,
      lon: -122.0096567,
    };

    sanitizer.sanitizeLocation(mockLocation)
      .then((data) => {
        expect(data).to.have.property('latitude');
        expect(data).to.have.property('longitude');
        expect(data.latitude).to.be.equal(mockLocation.lat);
        expect(data.longitude).to.be.equal(mockLocation.lon);
        return done();
      });
  });

  it('should call coordinates calculator for location without lat/lng fields', function (done) {
    const mockCoordinatesCalculator = {
      get: function (location) {
        return new Promise((resolve, reject) => {
          expect(location.name).to.be.equal(mockLocation.name);
          return done();
        })
        
      }
    };
    const sanitizer = new LocationSanitizer({ coordinatesCalculator: mockCoordinatesCalculator });
    const mockLocation = {
      name: 'Awesome location',
    };

    sanitizer.sanitizeLocation(mockLocation)
      .then((data) => {
        return done(new Error('done() should be called into mockCoordinatesCalculator'));
      });
  });

  it('should return a filtered array if some locations are not found', function(done) {
    const mockCoordinatesCalculator = {
      get: function (location) {
        return new Promise((resolve, reject) => {
          if (location.name == 'End of Rainbow') {
            return resolve(null);
          } 
          return resolve({
            longitude: TestUtils.getRandomInt(10 * 1000, 30 * 1000 * 1000),
            latitude: TestUtils.getRandomInt(10 * 1000, 30 * 1000 * 1000)
          });
        })

      }
    };
    const sanitizer = new LocationSanitizer({ coordinatesCalculator: mockCoordinatesCalculator });
    const locations = [
      {
        address: 'Statue of Liberty',
      }, 
      {
        name: 'End of Rainbow'
      },
      {
        name: 'Steve Jobs Teather',
        lat: 37.3308337,
        lon: -122.0096567,
      }
    ];

    sanitizer.sanitizeArray(locations)
      .then((results) => {
        expect(results).to.be.an('array');
        expect(results.length).to.be.equal(2);
        expect(results[0].name).to.be.equal('Statue of Liberty');
        expect(results[0]).to.include.all.keys('longitude', 'latitude');
        expect(results[1].name).to.be.equal('Steve Jobs Teather');
        expect(results[1]).to.include.all.keys('longitude', 'latitude');
        done();
      })
      .catch(done);
  });
});