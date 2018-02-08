// ===== MONGOOSE.JS      ======
// ===== date:            ======
//
// mongoose
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// fs module for loading model åfiles
const fs = require('fs');

// Path
const path = require('path');

// connect to mongoose
mongoose.connect('mongodb://localhost/task-api', {
    useMongoClient: true, 
    autoIndex: false
  });
mongoose.connection.on('connected', () => console.log('connected to MongoDB'));

// create a variable that points to the path where all of the models live
const models_path = path.join(__dirname, './../models');

// read all of the files in the models_path and require (run) each of the javascript files
fs.readdirSync(models_path).forEach(function(file) {
    if(file.indexOf('.js') >= 0) {
        // require the file (this runs the model file which registers the schema)
        require(models_path + '/' + file);
    };
});