'use strict';

const expect = require('chai').expect;
const DistanceMatrixCalculator = require('../../lib/distance_matrix_calculator');
let testLocations = require('../../italian_major_cities.json');
describe('Distance Matrix Calculator', () => {
  it('should return a matrix', function(done) {
    const calc = new DistanceMatrixCalculator();
    calc.geolib = {
      getDistance: function(source, target) {
        return getRandomInt(10 * 1000, 3 * 1000 * 1000);       
      }
    };
    //testLocations = testLocations.slice(0, 4);
    const output = calc.calculateFor(testLocations);
    expect(output).to.be.an('array');
    expect(output.length).to.be.equal(testLocations.length);
    output.forEach((row, rowIndex) => {
      expect(row).to.be.an('array');
    });
      
    return done();
  });
  describe('Matrix Output', function() {
    it('should have null diagonal', () => {
      const calc = new DistanceMatrixCalculator();
      calc.geolib = {
        getDistance: function (source, target) {
          return getRandomInt(10 * 1000, 3 * 1000 * 1000);
        }
      };
      const output = calc.calculateFor(testLocations);
      output.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
          if (columnIndex == rowIndex) {
            expect(column).to.be.a('null');
          }
        });
      });
    });

    it('should have symmetric values', () => {
      const calc = new DistanceMatrixCalculator();
      calc.geolib = {
        getDistance: function (source, target) {
          return getRandomInt(10 * 1000, 3 * 1000 * 1000);
        }
      };
      //testLocations = testLocations.slice(0, 4);
      const output = calc.calculateFor(testLocations);
      output.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
          if (columnIndex != rowIndex) {
            expect(column).to.be.a('number');
            if (rowIndex < columnIndex) {
              expect(output[rowIndex][columnIndex]).to.be.equal(output[columnIndex][rowIndex]);
            }
          }
        });
      });
    });
  });
});



function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}