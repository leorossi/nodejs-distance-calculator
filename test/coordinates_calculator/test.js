'use strict';

const expect = require('chai').expect;
const CoordinatesCalculator = require('../../lib/coordinates_calculator');

const mockGeocoder = function mockGeocoder() {

};

describe('Coordinates Calculator', () => {
  
  it('should not call geocoder if location has longitude and latitude', function(done) {
    const geocoder = {
      translate: function(name) {
        return done(new Error('Geocoder should not be called'))
      }
    }
    const calculator = new CoordinatesCalculator({ Geocoder: geocoder });
    calculator.get({
      longitude: 123,
      latitude: 456
    })
    .then((result) => {
      expect(result).to.have.property('longitude')
      expect(result).to.have.property('latitude')
      expect(result.longitude).to.equal(123);
      expect(result.latitude).to.equal(456);
      done();
    })
  });

  it('should call geocoder if location has address', function(done) {
    const geocoder = {
      translate: function(name) {
        return new Promise((resolve, reject) => {
          expect(name).to.be.equal('An Address');
          done();
        });
        
      }
    }
    const calculator = new CoordinatesCalculator({ Geocoder: geocoder });
    calculator.get({
      address: 'An Address'
    })
    .then((result) => {
      done(new Error('Should not arrive here'));
    })
  });

  it('should call geocoder if location has name', function(done) {
    const geocoder = {
      translate: function(name) {
        return new Promise((resolve, reject) => {
          expect(name).to.be.equal('A name');
          done();
        });
        
      }
    }
    const calculator = new CoordinatesCalculator({ Geocoder: geocoder });
    calculator.get({
      name: 'A name'
    })
    .then((result) => {
      done(new Error('Should not arrive here'));
    })
  });

  it('should call geocoder with address if location has name and address', function(done) {
    const geocoder = {
      translate: function(name) {
        return new Promise((resolve, reject) => {
          expect(name).to.be.equal('An Address');
          done();
        });  
      }
    }
    const calculator = new CoordinatesCalculator({ Geocoder: geocoder });
    calculator.get({
      name: 'A name',
      address: 'An Address'
    })
    .then((result) => {
      done(new Error('Should not arrive here'));
    })
  });
});