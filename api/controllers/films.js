'use strict';
const appRoot = require('app-root-path');

const StarshipRepository = require(`${appRoot}/api/repository/starship`);
const FilmRepository = require(`${appRoot}/api/repository/film`);

const _starshipRepository = new StarshipRepository();
const _filmRepository = new FilmRepository();

module.exports = { getFilms, saveFilm, getFilm, updateFilm, deleteFilm };


//POST /film operationId
function saveFilm(req, res, next) {
    _filmRepository.add(req.body).then((data) => {
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
    console.log(id);
    _filmRepository.get(id).then((data) => {
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
    var film = req.body;
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    _filmRepository.update(id, film).then((data) => {
        if (data <= 0) {
            res.status(404).json({ message: "Não encontrado" });
        } else {
            res.json({ success: 1, description: "film updated!" });
        }
    }).catch((error) => {
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