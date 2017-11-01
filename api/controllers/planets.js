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

module.exports = { getPlanets, savePlanet, getPlanet, updatePlanet, deletePlanet };


//POST /planet operationId
function savePlanet(req, res, next) {
    var entity = req.body;
    _planetRepository.add(entity).then((data) => {
        res.json({ success: 1, description: "planet criada!" });
    }).catch((error) => {
        res.status(204).json({ message: `${error}` });
    });
}

//GET /planet operationId
function getPlanets(req, res, next) {
    _planetRepository.list().then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(400).json({ message: `${error}` });
    });
}

function getPlanet(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters    
    _planetRepository.get(id).then((data) => {
        data.dataValues.planets = data.planets;
        if (data <= 0) {
            res.sendStatus(404);
        } else {
            res.json(data);
        }
    }).catch((error) => {
        res.status(204).send(error);
    });
}

//PUT /planet/{id} operationId
function updatePlanet(req, res, next) {
    var entity = req.body;
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters

    var promiseList = [];
    promiseList.push(Promise.all(entity.fimls.map((item) => {
        return _filmsRepository.get(item);
    })));
    promiseList.push(Promise.all(entity.people.map((item) => {
        return _peopleRepository.get(item);
    })));
    
    Promise.all(promiseList).then((results) => {        
        var films = _.compact(results[0]);
        var people = _.compact(results[1]);       

        return _planetRepository.update(id, entity, films, people);
    }).then((data) => {
        if (data <= 0) {
            res.status(404).json({ message: "Não encontrado" });
        } else {
            res.json({ success: 1, description: "planet updated!" });
        }
    }).catch((error) => {
        console.log(error);
        res.status(400).json({ message: `${error}` });
    });
}

function deletePlanet(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    _planetRepository.remove(id).then((data) => {
        if (data <= 0) {
            res.status(404).json({ message: "Não encontrado" });
        } else {
            res.json({ success: 1, description: "planet deleted!" });
        }
    }).catch((error) => {
        res.status(400).json({ message: `${error}` });
    });

}