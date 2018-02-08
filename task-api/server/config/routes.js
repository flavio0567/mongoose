// ===== ROUTES.JS ======
// ===== date:     ======
//
const path = require('path');
let task = require('../controllers/tasks.js');

module.exports = function(app) {
    app
    .get('/tasks', function(req, res){
        task.index(req, res)})
    .get('/tasks/:id', function(req, res){
        task.show(req, res, req.params.id)})
    .post('/tasks/:title/:description', function(req, res){
        task.new(req, res)})
    .put('/tasks/:id/:title/:description/:completed', function(req, res){
        task.update(req, res, req.params.id)})
    .delete('/tasks/:id', function(req, res){
        task.delete(req, res, req.params.id)})

}