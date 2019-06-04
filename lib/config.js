'use strict';

require('dotenv').config();

module.exports = function(value) {
  if (undefined !== process.env[value]) {
    return process.env[value];
  }
  return null;
};