'use strict';
const appRoot = require('app-root-path');

const swapi = require(`${appRoot}/api/lib/swapi-node`);
const BASE_URL = 'https://swapi.co/api/';


const StarshipRepository = require(`${appRoot}/api/repository/starship`);
const FilmRepository = require(`${appRoot}/api/repository/film`);

const _starshipRepository = new StarshipRepository();
const _filmRepository = new FilmRepository();

module.exports = { populate };



//GET /populate operationId
function populate(req, res, next) {
    console.log("populate");
    try {
        callStarship();

        res.json({ success: 1, description: "starship criada!" });
    } catch (err) {
        res.status(204).json({ message: `${err}` });
    }
}


function callStarship(url) {
    console.log(url);
    if (url === undefined)
        url = 'https://swapi.co/api/starships';
    if (url != null)
        swapi.get(url).then((result) => {
            result.results.forEach(function (element) {
                saveOrUpdateStarship(element);
            }, this);
            // callStarship(result.next);
        }).catch((error) => {
            throw error;
        });
}

function saveOrUpdateStarship(element) {
    _starshipRepository.getByUrl(element.url).then((starship) => {
        //console.log(element);
        if (starship <= 0) {
            console.log("Não encontrado pela url");
            _starshipRepository.add(element).then((data) => {
                console.log(data);
                console.log("starship criada!");
            }).catch((error) => {
                console.log(error);
            });
        } else {
            console.log("encontrado pela url");
            starship.MGLT = element.MGLT;
            starship.passengers = element.passengers;
            starship.name = element.name;
            starship.crew = element.crew;
            starship.model = element.model;
            starship.consumables = element.consumables;
            starship.length = element.length;
            starship.max_atmosphering_speed = element.max_atmosphering_speed;
            starship.cost_in_credits = element.cost_in_credits;
            starship.cargo_capacity = element.cargo_capacity;
            starship.starship_class = element.starship_class;
            starship.url = element.url;
            starship.hyperdrive_rating = element.hyperdrive_rating;
            starship.manufacturer = element.manufacturer;

            var array = element.films.map((url) => {
                console.log(url);
                swapi.get(url).then((result) => {
                    saveOrUpdateFilm(result).then((entity) =>{
                        return _filmRepository.getByUrl(url);
                    });                    
                }).catch((error) => {
                    throw error;
                });

            });
            
            Promise.all(array).then(values => {
                console.log(values);
                _starshipRepository.update(starship.id, starship.dataValues, values).then((data) => {
                    if (data <= 0) {
                        console.log("Não encontrado");
                    } else {
                        console.log("starship updated!");
                    }
                });
            });

        }
    });
}


function saveOrUpdateFilm(element) {
    return new Promise((resolve, reject) => {
        _filmRepository.getByUrl(element.url).then((entity) => {            
            if (entity <= 0) {
                console.log("Não encontrado pela url");                
                _filmRepository.add(element).then((data) => {
                    //console.log(data);
                    console.log("film criada!");
                    resolve(data);
                }).catch((error) => {
                    reject(error);
                });
            } else {
                console.log("encontrado pela url");
                //console.log(element);
                entity.title = element.title;
                entity.episode_id = element.episode_id;
                entity.opening_crawl = element.opening_crawl;
                entity.director = element.director;
                entity.producer = element.producer;
                entity.release_date = element.release_date;
                entity.url = element.url;

                _filmRepository.update(entity.id, entity.dataValues, null).then((data) => {
                    if (data <= 0) {
                        console.log("Não encontrado");
                        reject(error);
                    } else {
                        console.log("film updated!");
                        resolve(data);
                    }
                });
            }
        });
    })
}
