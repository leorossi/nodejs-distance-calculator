'use strict';

const Hapi = require('@hapi/hapi');

const Server = function Server({ config, distanceMatrixCalculator, locationSanitizer, closestLocationFinder}) {
  this._config = config;
  this._server = Hapi.server({
    port: config('HTTP_PORT'),
    host: 'localhost'
  });

  this.tools = {
    distanceMatrixCalculator: distanceMatrixCalculator,
    locationSanitizer: locationSanitizer,
    closestLocationFinder: closestLocationFinder
  }


  this.configureRoutes();
};
Server.prototype.start = function() {
  this._server.start()
    .then(() => {
      console.log(`Server listening on ${this._server.info.uri}`);
    });  
}

Server.prototype.configureRoutes = function() {
  this._server.route({
    method: 'POST',
    path: '/locations',
    handler: (request, h) => {
      let locations;
      let distanceMatrix;
      if (!Array.isArray(request.payload)) {
        const data = {
          message: 'Bad payload'
        };
        return h.response(data).code(400);
      }
      return this.tools.locationSanitizer.sanitizeArray(request.payload)
        .then((sanitizedLocations) => {
          locations = sanitizedLocations;
          return this.tools.distanceMatrixCalculator.calculateFor(sanitizedLocations);
        })
        .then((matrix) => {
          distanceMatrix = matrix;
          return this.tools.closestLocationFinder.getFor(matrix);
        })
        .then((results) => {
          const output = [];
          results.forEach((res, index) => {
            output.push({
              source: locations[index].name,
              target: locations[res].name,
              distance: distanceMatrix[index][res],
            });
          });
          return output;
        });
      
    }
  })
}
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

module.exports = Server;