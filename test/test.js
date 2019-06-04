const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '.env')
});
require('./geocoder/test');
require('./coordinates_calculator/test');
require('./distance_matrix_calculator/test');
require('./locations_sanitizer/test');