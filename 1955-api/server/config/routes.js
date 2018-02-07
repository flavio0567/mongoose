// ===== ROUTES.JS ======
// ===== date:     ======
//
const path = require('path');
let api1955 = require('../controllers/api1955.js');

module.exports = function(app) {
    app
    .get('', function(req, res){
        api1955.index(req, res)})
    .get('/:name', function(req, res){
        let name = req.params.name;
        api1955.show(req, res, name)})
    .get('/new/:name', function(req, res){
        api1955.new(req, res, req.params.name)})
    .get('/remove/:name', function(req, res){
        api1955.remove(req, res)})
}