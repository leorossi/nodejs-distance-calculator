'use strict';

const container = require('./lib/container');
const config = container.resolve('config');
const server = container.resolve('server');
server.start();