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

module.exports = { getPeopleList, savePeople, getPeople, updatePeople, deletePeople };


//POST /people operationId
function savePeople(req, res, next) {
    var entity = req.body;
    _peopleRepository.add(entity).then((data) => {
        res.json({ success: 1, description: "people criada!" });
    }).catch((error) => {
        res.status(204).json({ message: `${error}` });
    });
}

//GET /people operationId
function getPeopleList(req, res, next) {
    _peopleRepository.list().then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(400).json({ message: `${error}` });
    });
}

function getPeople(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters    
    _peopleRepository.get(id).then((data) => {        
        data.dataValues.people = data.people;
        if (data <= 0) {
            res.sendStatus(404);
        } else {            
            res.json(data);
        }
    }).catch((error) => {
        console.log(error);
        res.status(204).send(error);
    });
}

//PUT /people/{id} operationId
function updatePeople(req, res, next) {
    var entity = req.body;
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters

    var promiseList = [];
    promiseList.push(Promise.all(entity.starships.map((item) => {
        return _starshipRepository.get(item);
    })));
    promiseList.push(Promise.all(entity.films.map((item) => {
        return _filmRepository.get(item);
    })));
    promiseList.push(_planetRepository.get(entity.planet));
    promiseList.push(Promise.all(entity.vehicles.map((item) => {
        return _vehicleRepository.get(item);
    })));
    promiseList.push(Promise.all(entity.species.map((item) => {
        return _specieRepository.get(item);
    })));
    Promise.all(promiseList).then((results) => {        
        var starships = _.compact(results[0]);
        var film = _.compact(results[1]);
        var planet = results[2];
        var vehicles = _.compact(results[3]);
        var species = _.compact(results[4]);

        return _peopleRepository.update(id, entity, films, planet, starships, vehicles, species);
    }).then((data) => {
        if (data <= 0) {
            res.status(404).json({ message: "Não encontrado" });
        } else {
            res.json({ success: 1, description: "people updated!" });
        }
    }).catch((error) => {
        console.log(error);
        res.status(400).json({ message: `${error}` });
    });
}

function deletePeople(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    _peopleRepository.remove(id).then((data) => {
        if (data <= 0) {
            res.status(404).json({ message: "Não encontrado" });
        } else {
            res.json({ success: 1, description: "people deleted!" });
        }
    }).catch((error) => {
        res.status(400).json({ message: `${error}` });
    });

}