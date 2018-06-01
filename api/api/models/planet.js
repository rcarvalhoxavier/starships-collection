'use strict';

const appRoot = require('app-root-path');

module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Planet', {
      orbital_period: {
        type: DataTypes.STRING,
        description: 'The number of standard days it takes for this planet to complete a single orbit of its local star.'
      },
      population: {
        type: DataTypes.STRING,
        description: 'The average populationof sentient beings inhabiting this planet.'
      },
      climate: {
        type: DataTypes.STRING,
        description: 'The climate of this planet. Comma-seperated if diverse.'
      },
      diameter: {
        type: DataTypes.STRING,
        description: 'The diameter of this planet in kilometers.'
      },
      surface_water: {
        type: DataTypes.STRING,
        description: 'The percentage of the planet surface that is naturally occuring water or bodies of water.'
      },
      name: {
        type: DataTypes.STRING,
        description: 'The name of this planet.'
      },
      url: {
        type: DataTypes.STRING,
        description: 'The hypermedia URL of this resource.'
      },
      rotation_period: {
        type: DataTypes.STRING,
        description: 'The number of standard hours it takes for this planet to complete a single rotation on its axis.'
      },
      terrain: {
        type: DataTypes.STRING,
        description: 'the terrain of this planet. Comma-seperated if diverse.'
      },
      gravity: {
        type: DataTypes.STRING,
        description: 'A number denoting the gravity of this planet. Where 1 is normal.'
      }

    });
    model.associate = function (models) {
        model.belongsToMany(models.Film, { through: 'FilmPlanet' });
        model.hasMany(models.People);
        model.hasMany(models.Specie);
    }

    return model;
};