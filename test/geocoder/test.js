'use strict';

const expect = require('chai').expect;
const mockConfig = function(value) {
  if (value === 'GOOGLE_GEOCODE_API_KEY') {
    return process.env['GOOGLE_GEOCODE_API_KEY'];
  }
};
const GeocoderClass = require('../../lib/geocoder');

const Geocoder = new GeocoderClass({ config: mockConfig });
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

  it('should throw exception if no GOOGLE_GEOCODE_API_KEY is set', function(done) {
    const mockConfig = function (value) {
      if (value === 'GOOGLE_GEOCODE_API_KEY') {
        return null;
      }
    };
    
    expect(function() {
      const BadGeocoder = new GeocoderClass({ config: mockConfig });
    }).to.throw();
    done();
    
  });
});