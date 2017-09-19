'use strict';

const appRoot = require('app-root-path');
const db = require(`${appRoot}/api/models`);

class Starships {

    add(starship) {
        return new Promise((resolve, reject) => {
            db.Starship
                .create(starship)
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    list() {
        return new Promise((resolve, reject) => {
            db.Starship
                .findAll()
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    get(_id) {
        return new Promise((resolve, reject) => {
            db.Starship
                .findOne({
                    where: {
                        id: _id
                    }
                })
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    remove(_id) {
        return new Promise((resolve, reject) => {
            db.Starship.destroy({
                    where: {
                        id: _id
                    }
                }).then((res) => {
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
        });
    }

    update(_id, data) {
        return new Promise((resolve, reject) => {
            db.Starship
                .update(data, {
                    where: {
                        id: _id
                    }
                })
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
module.exports = Starships;