'use strict';

const appRoot = require('app-root-path');
const db = require(`${appRoot}/api/models`);

class People {

    add(entity) {
        return new Promise((resolve, reject) => {
            db.People
                .create(entity).then((res) => {
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
        });
    }

    list() {
        return new Promise((resolve, reject) => {
            db.People
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
            db.People
                .findOne(
                {
                    include: [ db.Starship, db.Film, db.Planet, db.Vehicle, db.Specie ],
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
            db.People
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
            db.People.destroy({
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

    update(_id, data, films, planet, starships, vehicles, species) {
        return new Promise((resolve, reject) => {
            db.People
                .update(data, {
                    where: {
                        id: _id
                    }
                }).then((res) => {
                    if (res <= 0)
                        resolve(res);
                    else {
                        var promiseList = [];
                        this.get(_id).then((people) => {
                            if (starships != undefined && starships.length > 0)
                                promiseList.push(people.setStarships(starships));
                            if (films != undefined && films.length > 0)
                                promiseList.push(people.setFilms(films));
                            if (planet != undefined && planet != null)
                                promiseList.push(people.setPlanet(planet));
                            if (vehicles != undefined && vehicles.length > 0)
                                promiseList.push(people.setVehicles(vehicles));
                            if (species != undefined && species.length > 0)
                                promiseList.push(people.setSpecies(species));
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
module.exports = People;