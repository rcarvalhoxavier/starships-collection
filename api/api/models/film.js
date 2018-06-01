'use strict';

const appRoot = require('app-root-path');

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Film', {
    opening_crawl: {
      type: DataTypes.TEXT,
      description: 'The opening crawl text at the beginning of this film.'
    },
    release_date: {
      type: DataTypes.DATE,
      description: 'The release date at original creator country.'
    },
    title: {
      type: DataTypes.STRING,
      description: 'The title of this film.'
    },
    producer: {
      type: DataTypes.STRING,
      description: 'The producer(s) of this film.'
    },
    episode_id: {
      type: DataTypes.INTEGER,
      description: 'The episode number of this film.'
    },
    director: {
      type: DataTypes.STRING,
      description: 'The director of this film.'
    },
    url: {
      type: DataTypes.STRING,
      description: 'The url of this resource',
      format: 'uri'
    }
  });
  model.associate = function (models) {
    model.belongsToMany(models.Starship, { through: 'FilmStarship' });
    model.belongsToMany(models.Vehicle, { through: 'FilmVehicle' });
    model.belongsToMany(models.Planet, { through: 'FilmPlanet' });
    model.belongsToMany(models.Specie, { through: 'FilmSpecie' });
    model.belongsToMany(models.People, {through: 'FilmPeople' });

    
  }

  /*
      planets: {
        type: 'array',
        description: 'The planet resources featured within this film.'
      },
  
      species: {
        type: 'array',
        description: 'The species resources featured within this film.'
      },
  
      characters: {
        type: 'array',
        description: 'The people resources featured within this film.'
      },
  
      vehicles: {
        type: 'array',
        description: 'The vehicle resources featured within this film.'
      },  */

  return model;
};

