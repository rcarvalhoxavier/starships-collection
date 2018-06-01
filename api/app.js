'use strict';

var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./api/models');
const fs = require('fs');
const yaml = require('js-yaml');
const appRoot = require('app-root-path');
const app = express();



const env = process.env.NODE_ENV || 'local';
const config = yaml.safeLoad(fs.readFileSync(`${appRoot}/config/config_${env}.yaml`, 'utf8'));
const port = config.api.port || process.env.PORT;
console.log(env);
console.log("port " + port);

app.set('view engine', 'html');
app.set('views', 'public');
app.set('port', port);


app.use("/api/swagger/paths", express.static(`${appRoot}/api/swagger/paths`));
app.use("/api/swagger/models", express.static(`${appRoot}/api/swagger/models`));

// database
db.sequelize.sync({ force: config.db.wipe }).then(() => {
  console.log('Database synced' +  // eslint-disable-line no-console
    `${config.db.wipe ? ' - data it\'s wiped & schema recreated' : ''}`);
});

// init server
app.listen(port, () => {
  console.log(`listening on port ${port}`); // eslint-disable-line no-console
});




module.exports = app; // for testing

var configurationSwagger = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(configurationSwagger, function (err, swaggerExpress) {
  if (err) { throw err; }
  // Add swagger-ui (This must be before swaggerExpress.register)
  app.use(SwaggerUi(swaggerExpress.runner.swagger));
  // install middleware
  swaggerExpress.register(app);

});



