'use strict';

const assert = require('assert');
const expect = require('chai').expect;
const Geocoder = require('../../lib/geocoder');

describe('Geocoder', () => {
  
  it('should translate a location name', function(done) {
    const name = 'MOMA Museum';
    Geocoder.translate(name)
      .then((result) => {
        expect(result).to.have.property('longitude');
        expect(result).to.have.property('latitude');
        done();
      })
  });

  it('should translate a location address', function(done) {
    const name = '60 Darghan Street, Glebe, NSW';
    Geocoder.translate(name)
      .then((result) => {
        expect(result).to.have.property('longitude');
        expect(result).to.have.property('latitude');
        done();
      })
  });

  it('should return null for invalid address', function(done) {
    const name = 'clearly an invalid address';
    Geocoder.translate(name)
      .then((result) => {
        expect(result).to.be.null;
        done();
      });
  });

  it('should throw exception if no GOOGLE_GEOCODE_API_KEY is set in environment', function(done) {
    delete require.cache[require.resolve('../../lib/geocoder')]
    delete process.env['GOOGLE_GEOCODE_API_KEY'];
    expect(function() {
      const BadGeocoder = require('../../lib/geocoder');
    }).to.throw();
    done();
    
  });
});