'use strict';

const appRoot = require('app-root-path');
const db = require(`${appRoot}/api/models`);

class Planets {

    add(entity) {
        return new Promise((resolve, reject) => {
            db.Planet
                .create(entity).then((res) => {
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
        });
    }

    list() {
        return new Promise((resolve, reject) => {
            db.Planet
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
            db.Planet
                .findOne(
                {
                    include: [{ all: true }],
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
            db.Planet
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
            db.Planet.destroy({
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

    update(_id, data, films, peoples) {
        return new Promise((resolve, reject) => {
            db.Planet
                .update(data, {
                    where: {
                        id: _id
                    }
                }).then((res) => {
                    if (res <= 0)
                        resolve(res);
                    else {
                        var promiseList = [];
                        this.get(_id).then((planet) => {
                            if (films != undefined && films.length > 0)
                                promiseList.push(planet.setFilms(films));
                            if (peoples != undefined && peoples.length > 0)
                                promiseList.push(planet.setPeople(peoples));
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
module.exports = Planets;