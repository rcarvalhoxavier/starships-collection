'use strict';

const appRoot = require('app-root-path');
const db = require(`${appRoot}/api/models`);

class Vehicles {

    add(entity) {
        return new Promise((resolve, reject) => {
            db.Vehicle
                .create(entity).then((res) => {
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
        });
    }

    list() {
        return new Promise((resolve, reject) => {
            db.Vehicle
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
            db.Vehicle
                .findOne(
                {
                    include: [{
                        model: db.Film,
                        require: false,
                        attributes: ['id', 'name', 'url']
                    },
                    {
                        model: db.People,
                        require: false,
                        attributes: ['id', 'name', 'url']
                    }],
                    where: { id: _id }
                })
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getByUrl(_url) {
        return new Promise((resolve, reject) => {
            db.Vehicle
                .findOne(
                {
                    where: { url: _url }
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
            db.Vehicle.destroy({
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

    update(_id, data, films) {
        return new Promise((resolve, reject) => {
            db.Vehicle
                .update(data, {
                    where: {
                        id: _id
                    }
                }).then((res) => {
                    if (res <= 0)
                        resolve(res);
                    else {
                        var promiseList = [];
                        this.get(_id).then((entity) => {
                            if (films != undefined && films.length > 0)
                                promiseList.push(entity.setFilms(films));
                            Promise.all(promiseList).then(() => {
                                resolve(res);
                            }).catch((error) => {
                                reject(error);
                            });
                        }).catch((error) => {
                            reject(error);
                        });
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
module.exports = Vehicles;