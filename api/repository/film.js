'use strict';

const appRoot = require('app-root-path');
const db = require(`${appRoot}/api/models`);

class Films {

    add(film, starships) {
        return new Promise((resolve, reject) => {
            db.Film
                .create(film).then((film, res) => {
                    if (starships != undefined && starships.length > 0) {
                        film.addStarships(starships).then((res) => {
                            resolve(res);
                        }).catch((error) => {
                            reject(error);
                        });
                    } else
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
                    include: [db.Starship],
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

    update(_id, data, starships) {
        return new Promise((resolve, reject) => {
            db.Film
                .update(data, {
                    where: {
                        id: _id
                    }
                }).then((res) => {
                    if (starships != undefined && starships.length > 0) {
                        this.get(_id).then((film) => {
                            film.setStarships(starships).then((res) => {
                                resolve(res);
                            }).catch((error) => {
                                reject(error);
                            });
                        }).catch((error) => {
                            reject(error);
                        });
                    }
                    else
                        resolve(res);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
module.exports = Films;