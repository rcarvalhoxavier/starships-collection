'use strict';

const appRoot = require('app-root-path');
const db = require(`${appRoot}/api/models`);

class Films {

    add(entity, starships) {
        return new Promise((resolve, reject) => {
            db.Film
                .create(entity).then((res) => {
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });

        });
    }

    list() {
        return new Promise((resolve, reject) => {
            db.Film
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
            db.Film
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
            db.Film
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
            db.Film.destroy({
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

    update(_id, data, people, planets, starships, vehicles, species) {
        return new Promise((resolve, reject) => {
            db.Film
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
                            if (starships != undefined && starships.length > 0)                             
                                promiseList.push(entity.setStarships(starships));
                            if (people != undefined && people.length > 0)
                                promiseList.push(entity.setPeople(people));
                            if (planets != undefined && planets.length > 0)
                                promiseList.push(entity.setPlanets(planets));
                            if (vehicles != undefined && vehicles.length > 0)
                                promiseList.push(entity.setVehicles(vehicles));
                            if (species != undefined && species.length > 0)
                                promiseList.push(entity.setSpecies(species));
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
module.exports = Films;