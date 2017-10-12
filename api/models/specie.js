'use strict';

const appRoot = require('app-root-path');

module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Specie', {

      url: {
        format: 'uri',
        type: DataTypes.STRING,
        description: 'The hypermedia URL of this resource.'
      },
      hair_colors: {
        type: DataTypes.STRING,
        description: 'A comma-seperated string of common hair colors for this species, none if this species does not typically have hair.'
      },
      average_lifespan: {
        type: DataTypes.STRING,
        description: 'The average lifespan of this species in years.'
      },
      average_height: {
        type: DataTypes.STRING,
        description: 'The average height of this person in centimeters.'
      },
      designation: {
        type: DataTypes.STRING,
        description: 'The designation of this species.'
      },
      name: {
        type: DataTypes.STRING,
        description: 'The name of this species.'
      },
      classification: {
        type: DataTypes.STRING,
        description: 'The classification of this species.'
      },
      eye_colors: {
        type: DataTypes.STRING,
        description: 'A comma-seperated string of common eye colors for this species, none if this species does not typically have eyes.'
      },
      language: {
        type: DataTypes.STRING,
        description: 'The language commonly spoken by this species.'
      },
      skin_colors: {
        type: DataTypes.STRING,
        description: 'A comma-seperated string of common skin colors for this species, none if this species does not typically have skin.'
      }
      


    });
    model.associate = function (models) {
        model.belongsToMany(models.People, { through: 'SpeciePeople' });
        model.belongsToMany(models.Film, { through: 'FilmSpecie' });
        model.belongsTo(models.Planet);
    }

    return model;
};