// Main constants
global.express = require('express');
global.app = express();
global.bcrypt = require('bcryptjs');
global.path = require('path');
global.bodyParser = require('body-parser');
global.cors = require('cors');
global.postMaxSize = 50;
global.jwt = require('jsonwebtoken');
global.port = process.env.PORT || 3000;
global.server = require('http').createServer(app);
global.fse = require('fs-extra');

console.log(`Your port is ${port}`)


require('./directories');
require('./multer');
require('./mongoose');
require('./helpers');

// Express Validator
const {check, body, query, validationResult} = require('express-validator/check');

global.check = check;
global.body = body;
global.query = query;
global.validationResult = validationResult;
