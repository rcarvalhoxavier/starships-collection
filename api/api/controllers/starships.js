'use strict';
const appRoot = require('app-root-path');

const StarshipRepository = require(`${appRoot}/api/repository/starship`);
const FilmRepository = require(`${appRoot}/api/repository/film`);

const _repository = new StarshipRepository();
const _filmRepository = new FilmRepository();

module.exports = { getStarships, saveStarship, getStarship, updateStarship, deleteStarship };


//POST /starship operationId
function saveStarship(req, res, next) {
    var starship = req.body;
    var array = starship.films.map((item) => {
        console.log(item);
        return _filmRepository.get(item);
    });
    Promise.all(array).then(values => {
        _repository.add(starship, values).then((data) => {
            res.json({ success: 1, description: "starship criada!" });
        }).catch((error) => {
            res.status(204).json({ message: `${error}` });
        });
    });
}

//GET /starship operationId
function getStarships(req, res, next) {
    _repository.list().then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(400).json({ message: `${error}` });
    });
}

function getStarship(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    console.log(id);
    _repository.get(id).then((data) => {
        data.dataValues.films = data.films;
        console.log(data);
        if (data <= 0) {
            res.sendStatus(404);
        } else {
            res.json(data);
        }
    })
        .catch((error) => {
            res.status(204).send(error);
        });
}

//PUT /starship/{id} operationId
function updateStarship(req, res, next) {
    var starship = req.body;
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    console.log(starship);
    var array = starship.films.map((item) => {
        //console.log(item);
        return _filmRepository.get(item);
    });
    Promise.all(array).then(values => {
        _repository.update(id, starship, values).then((data) => {
            if (data <= 0) {
                res.status(404).json({ message: "Não encontrado" });
            } else {
                res.json({ success: 1, description: "starship updated!" });
            }
        }).catch((error) => {
            res.status(400).json({ message: `${error}` });
        });
    }).catch((error) => {
        res.status(400).json({ message: `${error}` });
    });


    /*
    
        var starship = req.body;
        var id = req.swagger.params.id.value; //req.swagger contains the path parameters
        _repository.update(id, starship).then((data) => {
            if (data <= 0) {
                res.status(404).json({ message: "Não encontrado" });
            } else {
                res.json({ success: 1, description: "starship updated!" });
            }
        }).catch((error) => {
            res.status(400).json({ message: `${error}` });
        });
    */
}

function deleteStarship(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    _repository.remove(id).then((data) => {
        if (data <= 0) {
            res.status(404).json({ message: "Não encontrado" });
        } else {
            res.json({ success: 1, description: "starship deleted!" });
        }
    }).catch((error) => {
        res.status(400).json({ message: `${error}` });
    });

}