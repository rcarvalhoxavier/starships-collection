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
                    include: [ 
                        {
                            model: db.People,
                            require: false,
                            attributes: ['id', 'name', 'url']
                        },
                        {
                            model: db.Film,
                            require: false,
                            attributes: ['id', 'title', 'url']
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

    update(_id, data, films, people) {
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
                            if (people != undefined && people.length > 0)
                                promiseList.push(planet.setPeople(people));
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