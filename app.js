'use strict';

var SwaggerExpress = require('swagger-express-mw');
const express    = require('express');
const bodyParser = require('body-parser');
//const db         = require('./app/models');
const fs     = require('fs');
const yaml   = require('js-yaml');
const appRoot   = require('app-root-path');
const app        = express();


const env = process.env.NODE_ENV || 'local';
const config = yaml.safeLoad(fs.readFileSync(`${appRoot}/config/config_${env}.yaml`, 'utf8'));

app.set('view engine', 'html');
app.set('views', 'public');
app.set('port', config.api.port);

// init server
app.listen(config.api.port, () => {
  console.log(`listening on port ${config.api.port}`); // eslint-disable-line no-console
});


module.exports = app; // for testing

var configurationSwagger = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(configurationSwagger, function(err, swaggerExpress) {
  if (err) { throw err; }
  // install middleware
  swaggerExpress.register(app);

});

