'use strict';

const appRoot = require('app-root-path');
const db = require(`${appRoot}/api/models`);

class Starships {

    add(starship, films) {
        return new Promise((resolve, reject) => {
            db.Starship
                .create(starship)
                .then((starship, res) => {
                    if (films != undefined)
                        starship.addFilms(films).then((res) => {
                            resolve(res);
                        });
                    else
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
                .findOne(
                {
                    include: [db.Film],
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
            db.Starship
                .findOne(
                {
                    include: [db.Film],
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

    update(_id, data, films) {
        return new Promise((resolve, reject) => {
            db.Starship
                .update(data, {
                    where: { id: _id }
                }).then((res) => {
                    if (films != undefined)
                        this.get(_id).then((starship) => {
                            starship.setFilms(films).then((res) => {
                                resolve(res);
                            }).catch((error) => {
                                reject(error);
                            });
                        }).catch((error) => {
                            reject(error);
                        });
                    else
                        resolve(res);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
module.exports = Starships;