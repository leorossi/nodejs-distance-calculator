'use strict';

const expect = require('chai').expect;
const ClosestLocationFinder = require('../../lib/closest_location_finder');
describe('Closest Location Finder', () => {
  it('should return an array of pair indexes', function(done) {
    const finder = new ClosestLocationFinder({});
    const matrix = [
      [null, 79887, 100022, 409869, 536460],
      [79887, null, 36993, 470900, 614054],
      [100022, 36993, null, 503082, 621274],
      [409869, 470900, 503082, null, 474394],
      [536460, 614054, 621274, 474394, null]
    ];
    const output = finder.getFor(matrix);
    expect(output).to.be.an('array');
    expect(output.length).to.be.equal(5);
    
    expect(output[0]).to.be.equal(1);
    expect(output[1]).to.be.equal(2);
    expect(output[2]).to.be.equal(1);
    expect(output[3]).to.be.equal(0);
    expect(output[4]).to.be.equal(3);
    done();
  });
})