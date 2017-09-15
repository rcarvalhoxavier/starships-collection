'use strict';

module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Starship', {
        model:
        {
            type: DataTypes.STRING,
            allowNull: false,
            description: 'The model or official name of this starship. Such as T-65 X-wing or DS-1 Orbital Battle Station.'
        },
        max_atmosphering_speed:
        {
            type: DataTypes.STRING,
            allowNull: false,
            description: 'The maximum speed of this starship in atmosphere. n/a if this starship is incapable of atmosphering flight.'
        },
        name:
        {
            type: DataTypes.STRING,
            allowNull: false,
            description: 'The name of this starship. The common name, such as Death Star.'
        },
        url:
        {
            type: DataTypes.STRING,
            allowNull: false,
            description: 'The hypermedia URL of this resource.'
        },
        created:
        {
            type: DataTypes.DATE,
            allowNull: false,
            description: 'The ISO 8601 date format of the time that this resource was created. 2012-04-23T18:25:43.511Z'
        },
        edited:
        {
            type: DataTypes.DATE,
            allowNull: false,
            description: 'the ISO 8601 date format of the time that this resource was edited. 2012-04-23T18:25:43.511Z'
        }


    });

    return model;
};
