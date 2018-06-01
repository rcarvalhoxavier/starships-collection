'use strict';

const appRoot = require('app-root-path');

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Starship', {
    MGLT: {
      type: DataTypes.STRING,
      allowNull: false,
      description: 'The Maximum number of Megalights this starship can travel in a standard hour. A Megalight is a standard unit of distance and has never been defined before within the Star Wars universe. This figure is only really useful for measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth.'
    },
    passengers: {
      type: DataTypes.STRING,
      allowNull: false,
      description: 'The number of non-essential people this starship can transport.'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      description: 'The name of this starship. The common name, such as Death Star.'
    },
    crew: {
      type: DataTypes.STRING,
      allowNull: false,
      description: 'The number of personnel needed to run or pilot this starship.'
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      description: 'The model or official name of this starship. Such as T-65 X-wing or DS-1 Orbital Battle Station.'
    },
    consumables: {
      type: DataTypes.STRING,
      allowNull: false,
      description: 'The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.'
    },
    length: {
      type: DataTypes.STRING,
      allowNull: false,
      description: 'The length of this starship in meters.'
    },
    max_atmosphering_speed: {
      type: DataTypes.STRING,
      allowNull: false,
      description: 'The maximum speed of this starship in atmosphere. n/a if this starship is incapable of atmosphering flight.'
    },
    cost_in_credits: {
      type: DataTypes.STRING,
      allowNull: false,
      description: 'The cost of this starship new, in galactic credits.'
    },
    cargo_capacity: {
      type: DataTypes.STRING,
      allowNull: false,
      description: 'The maximum number of kilograms that this starship can transport.'
    },
    starship_class: {
      type: DataTypes.STRING,
      allowNull: false,
      description: 'The class of this starship, such as Starfighter or Deep Space Mobile Battlestation.'
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      description: 'The hypermedia URL of this resource.',
      format: 'uri'
    },
    hyperdrive_rating: {
      type: DataTypes.STRING,
      allowNull: false,
      description: 'The class of this starships hyperdrive.'
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
      description: 'The manufacturer of this starship. Comma seperated if more than one.'
    }

  });
  model.associate = function (models) {
    model.belongsToMany(models.Film, { through: 'FilmStarship' });
    model.belongsToMany(models.People,{through: 'StarshipPeople'});
  }
  return model;
};