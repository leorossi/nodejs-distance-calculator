'use strict';

const Hapi = require('@hapi/hapi');

const Server = function Server({ config }) {
  //console.log(Config('GOOGLE_GEOCODE_API_KEY'));
  this._server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

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
}
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

module.exports = Server;