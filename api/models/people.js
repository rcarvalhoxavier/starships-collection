'use strict';

const appRoot = require('app-root-path');

module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('People', {
        name: {
            type: DataTypes.STRING,            
        },
        height: {
            type: DataTypes.STRING,
            description: 'The model or official name of this vehicle. Such as All Terrain Attack Transport.'
        },
        mass: {
            type: DataTypes.FLOAT,
            description: 'The cost of this vehicle new, in galactic credits.'
        },
        hair_color: {
            type: DataTypes.STRING,
            description: 'The model or official name of this vehicle. Such as All Terrain Attack Transport.'
        },
        skin_color: {
            type: DataTypes.STRING,
            description: 'The model or official name of this vehicle. Such as All Terrain Attack Transport.'
        },
        eye_color: {
            type: DataTypes.STRING,
            description: 'The model or official name of this vehicle. Such as All Terrain Attack Transport.'
        },
        birth_year: {
            type: DataTypes.STRING,
            description: 'The model or official name of this vehicle. Such as All Terrain Attack Transport.'
        },
        gender: {
            type: DataTypes.STRING,
            description: 'The model or official name of this vehicle. Such as All Terrain Attack Transport.'
        },
        height: {
            type: DataTypes.STRING,
            description: 'The model or official name of this vehicle. Such as All Terrain Attack Transport.'
        },
        height: {
            type: DataTypes.STRING,
            description: 'The model or official name of this vehicle. Such as All Terrain Attack Transport.'
        },
        url: {
          type: DataTypes.STRING,
          description: 'The url of this resource',
          format: 'uri'
        }

    });
    model.associate = function (models) {
        model.belongsToMany(models.Film, { through: 'FilmPeople' });
        model.belongsToMany(models.Vehicle, { through: 'VehiclePeople' });
        model.belongsToMany(models.Starship, { through: 'StarshipPeople' });
        model.belongsToMany(models.Specie, { through: 'SpeciePeople' });
        model.belongsTo(models.Planet);
    }

    return model;
};