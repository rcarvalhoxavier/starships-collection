'use strict';

const appRoot = require('app-root-path');
const db = require(`${appRoot}/api/models`);

class Starships {

    add(entity) {
        return new Promise((resolve, reject) => {
            db.Starship
                .create(entity)
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
                .findOne(
                {
                    include: [ 
                        {
                            model: db.Film,
                            require: false,
                            attributes: ['id','title', 'url']
                        },
                        {
                            model: db.People,
                            require: false,
                            attributes: ['id','name', 'url']
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
            db.Starship
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
module.exports = Starships;