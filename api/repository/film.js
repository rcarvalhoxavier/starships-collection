'use strict';

const appRoot = require('app-root-path');
const db = require(`${appRoot}/api/models`);

class Films {

    add(film) {
        return new Promise((resolve, reject) => {
            db.Film
                .create(film)
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

    update(_id, data) {
        return new Promise((resolve, reject) => {
            db.Film
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
module.exports = Films;