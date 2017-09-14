'use strict';
// Include our "db"
var db = require('../../config/db')();
// Exports all the functions to perform on the db
module.exports = { getAll, save, get, update, deleteOne };

//GET /starship operationId
function getAll(req, res, next) {
    res.json({ starships: db.find() });
}
//POST /starship operationId
function save(req, res, next) {
    if (db.save(req.body)) {
        res.json({ success: 1, description: "starship created!" });
    } else {
        res.status(204).send();
    }
}
//GET /starship/{id} operationId
function get(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    var starship = db.find(id);
    if (starship) {
        res.json(starship);
    } else {
        res.status(204).send();
    }
}
//PUT /starship/{id} operationId
function update(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    var starship = req.body;
    if (db.update(id, starship)) {
        res.json({ success: 1, description: "starship updated!" });
    } else {
        res.status(204).send();
    }

}
//DELETE /starship/{id} operationId
function deleteOne(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    if (db.remove(id)) {
        res.json({ success: 1, description: "starship deleted!" });
    } else {
        res.status(204).send();
    }

}