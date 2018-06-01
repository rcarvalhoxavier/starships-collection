'use strict';
const appRoot = require('app-root-path');
const _ = require('underscore');

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

module.exports = { getFilms, saveFilm, getFilm, updateFilm, deleteFilm };


//POST /film operationId
function saveFilm(req, res, next) {
    var entity = req.body;
    _filmRepository.add(entity).then((data) => {
        res.json({ success: 1, description: "film criada!" });
    }).catch((error) => {
        res.status(204).json({ message: `${error}` });
    });
}

//GET /film operationId
function getFilms(req, res, next) {
    _filmRepository.list().then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(400).json({ message: `${error}` });
    });
}

function getFilm(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters    
    _filmRepository.get(id).then((data) => {
        data.dataValues.films = data.films;
        if (data <= 0) {
            res.sendStatus(404);
        } else {
            res.json(data);
        }
    }).catch((error) => {
        res.status(204).send(error);
    });
}

//PUT /film/{id} operationId
function updateFilm(req, res, next) {
    var entity = req.body;
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters

    var promiseList = [];
    promiseList.push(Promise.all(entity.starships.map((item) => {
        return _starshipRepository.get(item);
    })));
    promiseList.push(Promise.all(entity.people.map((item) => {
        return _peopleRepository.get(item);
    })));
    promiseList.push(Promise.all(entity.planets.map((item) => {
        return _planetRepository.get(item);
    })));
    promiseList.push(Promise.all(entity.vehicles.map((item) => {
        return _vehicleRepository.get(item);
    })));
    promiseList.push(Promise.all(entity.species.map((item) => {
        return _specieRepository.get(item);
    })));
    Promise.all(promiseList).then((results) => {        
        var starships = _.compact(results[0]);
        var people = _.compact(results[1]);
        var planets = _.compact(results[2]);
        var vehicles = _.compact(results[3]);
        var species = _.compact(results[4]);

        return _filmRepository.update(id, entity, people, planets, starships, vehicles, species);
    }).then((data) => {
        if (data <= 0) {
            res.status(404).json({ message: "Não encontrado" });
        } else {
            res.json({ success: 1, description: "film updated!" });
        }
    }).catch((error) => {
        console.log(error);
        res.status(400).json({ message: `${error}` });
    });
}

function deleteFilm(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    _filmRepository.remove(id).then((data) => {
        if (data <= 0) {
            res.status(404).json({ message: "Não encontrado" });
        } else {
            res.json({ success: 1, description: "film deleted!" });
        }
    }).catch((error) => {
        res.status(400).json({ message: `${error}` });
    });

}