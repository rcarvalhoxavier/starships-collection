'use strict';

var SwaggerExpress = require('swagger-express-mw');
const express    = require('express');
const bodyParser = require('body-parser');
const db         = require('./api/models');
const fs     = require('fs');
const yaml   = require('js-yaml');
const appRoot   = require('app-root-path');
const app        = express();


const env = process.env.NODE_ENV || 'local';
const config = yaml.safeLoad(fs.readFileSync(`${appRoot}/config/config_${env}.yaml`, 'utf8'));

console.log(env);
console.log("port "+process.env.port);
console.log("dirname"+ __dirname);

app.set('view engine', 'html');
app.set('views', 'public');
app.set('port', config.api.port);

// database
db.sequelize.sync({ force : config.db.wipe }).then(() => {
  console.log('Database synced' +  // eslint-disable-line no-console
    `${config.db.wipe ? ' - data it\'s wiped & schema recreated' : ''}`);
});

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

