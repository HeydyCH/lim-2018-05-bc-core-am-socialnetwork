global.window = global;
global.assert = require('chai').assert;
require('../src/anterior/app.js');
require('./data.spec.js');
