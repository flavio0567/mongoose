// ===== API1955.JS ======
// ===== date:       ======
//
const mongoose  = require('mongoose');
const Task   = mongoose.model('Task');

module.exports = { 

    index: (req, res) => {
        Task.find({})
            .then(task => res.json(task))
            .catch(error => console.log(error));
    },
    show: (req, res) => {
        Task.findOne({_id: req.params.id})
            .then(task => res.json(task))
            .catch(error => console.log(error));
    },
    new:  (req, res) => {
        console.log('params: ', req.params);
        Task.create(req.params)
            .then(task => res.json(task))
            .catch(error => console.log(error));
    },
    delete: (req, res) => {
        Task.findById({_id: req.params.id }).remove().exec()
            .then(task => res.json(task))
            .catch(error => console.log(error));
    },
    update: (req, res) => {
        Task.update({_id: req.params.id }, {title: req.params.title, description: req.params.description, completed: req.params.completed})
            .then(task => res.json(task))
            .catch(error => console.log(error));
    }
};