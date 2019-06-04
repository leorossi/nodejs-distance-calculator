'use strict';

const Hapi = require('@hapi/hapi');

const Server = function Server({ distanceMatrixCalculator, locationSanitizer}) {
  this._server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  this.tools = {
    distanceMatrixCalculator: distanceMatrixCalculator,
    locationSanitizer: locationSanitizer,
  }

  this.configureRoutes();
};
Server.prototype.start = function() {
  this._server.start()
    .then(() => {
      console.log('Server started!');
    });  
}

Server.prototype.configureRoutes = function() {
  this._server.route({
    method: 'GET',
    path: '/locations',
    handler: (request, h) => {
      return 'Hello World';
    }
  })

  this._server.route({
    method: 'POST',
    path: '/locations',
    handler: (request, h) => {
      return this.tools.locationSanitizer.sanitizeArray(request.payload)
        .then((results) => {
          return this.tools.distanceMatrixCalculator.calculateFor(results);
          
        })
        .then((matrix) => {
          return matrix;
        })
      
    }
  })
}
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

module.exports = Server;