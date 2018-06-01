'use strict';

const appRoot = require('app-root-path');

module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Vehicle', {
        length: {
            type: DataTypes.STRING,
            description: 'The length of this vehicle in meters.'
        },
        model: {
            type: DataTypes.STRING,
            description: 'The model or official name of this vehicle. Such as All Terrain Attack Transport.'
        },
        cost_in_credits: {
            type: DataTypes.STRING,
            description: 'The cost of this vehicle new, in galactic credits.'
        },
        /*pilots: {
          type: 'array',
          description: 'An array of People URL Resources that this vehicle has been piloted by.'
        },*/
        manufacturer: {
            type: DataTypes.STRING,
            description: 'The manufacturer of this vehicle. Comma seperated if more than one.'
        },
        vehicle_class: {
            type: DataTypes.STRING,
            description: 'The class of this vehicle, such as Wheeled.'
        },
        passengers: {
            type: DataTypes.STRING,
            description: 'The number of non-essential people this vehicle can transport.'
        },
        name: {
            type: DataTypes.STRING,
            description: 'The name of this vehicle. The common name, such as Sand Crawler.'
        },
        consumables: {
            type: DataTypes.STRING,
            description: 'The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply.'
        },
        url: {
            type: DataTypes.STRING,
            description: 'The hypermedia URL of this resource.'
        },
        cargo_capacity: {
            type: DataTypes.STRING,
            description: 'The maximum number of kilograms that this vehicle can transport.'
        },
        max_atmosphering_speed: {
            type: DataTypes.STRING,
            description: 'The maximum speed of this vehicle in atmosphere.'
        },
        crew: {
            type: DataTypes.STRING,
            description: 'The number of personnel needed to run or pilot this vehicle.'
        }

    });
    model.associate = function (models) {
        model.belongsToMany(models.Film, { through: 'FilmVehicle' });
        model.belongsToMany(models.People, { through: 'VehiclePeoplers' });
    }

    return model;
};