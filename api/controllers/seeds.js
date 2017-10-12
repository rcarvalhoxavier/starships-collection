'use strict';
const appRoot = require('app-root-path');

const swapi = require(`${appRoot}/api/lib/swapi-node`);
const BASE_URL = 'https://swapi.co/api/';
const starshipUrl = 'starships';
const filmpUrl = 'films';

const StarshipRepository = require(`${appRoot}/api/repository/starship`);
const FilmRepository = require(`${appRoot}/api/repository/film`);

const _starshipRepository = new StarshipRepository();
const _filmRepository = new FilmRepository();

module.exports = { populate };



//GET /populate operationId
function populate(req, res, next) {
    console.log("populate");
    try {
        Promise.all([
            callURLEntity(BASE_URL + starshipUrl, "starship"),
            callURLEntity(BASE_URL + filmpUrl, "film")
        ]).then(() => {
            console.log("resolve ");
            buildFilmRelationship();
            res.json({ success: 1, description: "starship criada!" });
        }).catch((err) => {
            console.log(err);
            throw err;
        });
    } catch (err) {
        console.log(err);
        res.status(204).json({ message: `${err}` });
    }
}

function callURLEntity(url, model) {
    return new Promise((resolve, reject) => {
        console.log("url :" + url);
        console.log("model :" + model);
        swapi.get(url).then((result) => {
            return saveEntities(result, model);
        }).then(newUrl => {
            console.log(newUrl);
            if (newUrl != null)
                return callURLEntity(newUrl, model);
            else
                resolve(1);
        }).then(() => {
            console.log("encerrado " + model);
            resolve(1);
        }).catch((error) => {
            reject(error);
        });
    });
}


function saveEntities(result, model) {
    return new Promise((resolve, reject) => {
        console.log("Criando as promisses :" + model);
        var saves = result.results.map((element) => {
            switch (model) {
                case "starship":
                    return saveStarship(element);
                    break;
                case "film":
                    return saveFilm(element);
                    break;
                /*case "planet":
                return saveStarships(result);
                break;
                case "species":
                return saveStarships(result);
                break;
                case "people":
                return saveStarships(result);
                break;
                case "vehicles":
                return saveStarships(result);
                break;*/

            }
        });

        Promise.all(saves).then(() => {
            console.log("promisses executadas : " + model);
            resolve(result.next);
        });
    });
}

function saveStarship(element) {
    return new Promise((resolve, reject) => {
        _starshipRepository.add(element).then((data) => {
            console.log("starship criada!");
            resolve(data);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}
function saveFilm(element) {
    return new Promise((resolve, reject) => {
        _filmRepository.add(element).then((data) => {
            console.log("film criada!");
            resolve(data);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}

function buildFilmRelationship() {
    new Promise((resolve, reject) => {
        _filmRepository.list().then((films) => {
            films.forEach(function (film) {
                swapi.get(film.url).then((result) => {
                    console.log(result.starships);
                    var starshipsPromises = result.starships.map((_starshipUrl) => {
                        return _starshipRepository.getByUrl(_starshipUrl);
                    });
                    Promise.all(starshipsPromises).then((starships) => {
                        console.log("build relationship");
                        return _filmRepository.update(film.id, film, starships);
                    });
                }).then((data) => {
                    if (data <= 0)
                        reject();
                    else
                        resolve();
                });;
            }, this);
        });      
    });
}



