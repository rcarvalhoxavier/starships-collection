'use strict';
const appRoot = require('app-root-path');
const _ = require('underscore');

const swapi = require(`${appRoot}/api/lib/swapi-node`);
const BASE_URL = 'https://swapi.co/api/';
const starshipUrl = 'starships';
const filmUrl = 'films';
const peopleUrl = 'people';
const planetUrl = 'planets';
const specieUrl = 'species';
const vehicleUrl = 'vehicles';

const StarshipRepository = require(`${appRoot}/api/repository/starship`);
const FilmRepository = require(`${appRoot}/api/repository/film`);
const PeopleRepository = require(`${appRoot}/api/repository/people`);
const PlanetRepository = require(`${appRoot}/api/repository/planet`);
const SpecieRepository = require(`${appRoot}/api/repository/specie`);
const VehicleRepository = require(`${appRoot}/api/repository/vehicle`);


const _starshipRepository = new StarshipRepository();
const _filmRepository = new FilmRepository();
const _peopleRepository = new PeopleRepository();
const _planetRepository = new PlanetRepository();
const _specieRepository = new SpecieRepository();
const _vehicleRepository = new VehicleRepository();

module.exports = { populate };



//GET /populate operationId
function populate(req, res, next) {
    console.log("populate");
    try {
        Promise.all([
            callURLEntity(BASE_URL + starshipUrl, "starship"),
            callURLEntity(BASE_URL + filmUrl, "film"),
            callURLEntity(BASE_URL + peopleUrl, "people"),
            callURLEntity(BASE_URL + planetUrl, "planet"),
            callURLEntity(BASE_URL + specieUrl, "specie"),
            callURLEntity(BASE_URL + vehicleUrl, "vehicle")
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
                case "people":
                    return savePeople(element);
                    break;
                case "planet":
                    return savePlanet(element);
                    break;
                case "specie":
                    return saveSpecie(element);
                    break;
                case "vehicle":
                    return saveVehicle(element);
                    break;

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

function savePeople(element) {
    return new Promise((resolve, reject) => {
        _peopleRepository.add(element).then((data) => {
            console.log("people criada!");
            resolve(data);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}

function savePlanet(element) {
    return new Promise((resolve, reject) => {
        _planetRepository.add(element).then((data) => {
            console.log("planet criada!");
            resolve(data);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}

function saveSpecie(element) {
    return new Promise((resolve, reject) => {
        _specieRepository.add(element).then((data) => {
            console.log("specie criada!");
            resolve(data);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}


function saveVehicle(element) {
    return new Promise((resolve, reject) => {
        _vehicleRepository.add(element).then((data) => {
            console.log("vehicle criada!");
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
                    //console.log(result.starships);
                    var promiseList = [];
                    promiseList.push(Promise.all(result.starships.map((_url) => {
                        return _starshipRepository.getByUrl(_url);
                    })));
                    promiseList.push(Promise.all(result.characters.map((_url) => {
                        return _peopleRepository.getByUrl(_url);
                    })));
                    promiseList.push(Promise.all(result.planets.map((_url) => {
                        return _planetRepository.getByUrl(_url);
                    })));
                    promiseList.push(Promise.all(result.vehicles.map((_url) => {
                        return _vehicleRepository.getByUrl(_url);
                    })));
                    promiseList.push(Promise.all(result.species.map((_url) => {
                        return _specieRepository.getByUrl(_url);
                    })));
                    Promise.all(promiseList).then((results) => {
                        console.log("build relationship");
                        var starships = _.compact(results[0]);
                        var people = _.compact(results[1]);
                        var planets = _.compact(results[2]);
                        var vehicles = _.compact(results[3]);
                        var species = _.compact(results[4]);

                        return _filmRepository.update(film.id, film, people, planets, starships, vehicles, species);
                    });
                }).then((data) => {
                    if (data <= 0)
                        reject();
                    else
                        resolve();
                }).catch((error) => {
                    console.log(error);
                    throw error;
                });
            }, this);
        });
    });
}



