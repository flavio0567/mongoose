// ===== API1955.JS ======
// ===== date:       ======
//
const mongoose  = require('mongoose');
const Api1955   = mongoose.model('Api1955');

module.exports = { 

    index: (req, res) => {
        Api1955.find({})
            .then(api1955 => res.json(api1955))
            .catch(error => console.log(error));
    },
    show: (req, res) => {
        Api1955.findOne({name: req.params.name})
            .then(api1955 => res.json(api1955))
            .catch(error => console.log(error));
    },
    new:  (req, res) => {
        Api1955.create(req.params)
            .then(Api1955 => res.json(Api1955))
            .catch(error => console.log(error));
    },
    remove: (req, res) => {
        Api1955.find({name: req.params.name }).remove().exec()
            .then(Api1955 => res.json(Api1955))
            .catch(error => console.log(error));
    }

};