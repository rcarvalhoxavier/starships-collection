'use strict';

const Sequelize = require('sequelize');
const appRoot   = require('app-root-path');
const walkSync = require('walk-sync');
const fs     = require('fs');
const yaml   = require('js-yaml');

const env = process.env.NODE_ENV || 'local';
const config = yaml.safeLoad(fs.readFileSync(`${appRoot}/config/config_${env}.yaml`, 'utf8'));

const db = {};

const sequelize = new Sequelize(config.db);

const paths = walkSync(`${appRoot}/api/models`, {
  globs  : ['**/*.js'],
  ignore : ['index.js']
});

paths.forEach((file) => {
  const model    = sequelize.import(`${appRoot}/api/models/${file}`);
  db[model.name] = model;  
});

Object.keys(db).forEach((modelName) => {
  console.log("associate" in db[modelName]);
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
