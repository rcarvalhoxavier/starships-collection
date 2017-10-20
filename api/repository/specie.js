'use strict';

const appRoot = require('app-root-path');
const db = require(`${appRoot}/api/models`);

class Species {

    add(entity) {
        return new Promise((resolve, reject) => {
            db.Specie
                .create(entity).then((entity, res) => {
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
        });
    }

    list() {
        return new Promise((resolve, reject) => {
            db.Specie
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
            db.Specie
                .findOne(
                {
                    include: [ 
                        {
                            model: db.Planet,
                            require: false,
                            attributes: ['id', 'name', 'url']
                        },
                        {
                            model: db.People,
                            require: false,
                            attributes: ['id', 'name', 'url']
                        },
                        {
                            model: db.Film,
                            require: false,
                            attributes: ['id', 'name', 'url']
                        } ],
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
            db.Specie
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
            db.Specie.destroy({
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

    update(_id, data, films, planet, people) {
        return new Promise((resolve, reject) => {
            db.Specie
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
                            if (people != undefined && people.length > 0)
                                promiseList.push(entity.setPeople(people));
                            if (films != undefined && films.length > 0)
                                promiseList.push(entity.setFilms(films));
                            if (planet != undefined && planet != null)
                                promiseList.push(entity.setPlanet(planet));                            
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
module.exports = Species;