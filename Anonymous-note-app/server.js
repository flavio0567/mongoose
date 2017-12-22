// ===== SERVER.JS ======
// ======================
// This is the entry point of our server, it creates
// the all important express app, connects static paths,
// and requires our first modules.


const express = require('express');
const app = express();
const port = 1337;

const path = require('path');

// Static Directory
app.use(express.static(__dirname + '/angular-app/dist'));

// set parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/anonymous-notes/dist'));

// set ejs
app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));


// - - - - = = = = Model = = = = - - - - 
// define Schema variable
const mongoose = require('mongoose');
uniqueValidator = require('mongoose-unique-validator');
// Use Database with mongoose
mongoose.connect('mongodb://localhost/anonymous-note');
mongoose.connection.on('connected', () => console.log('connected to MongoDB'));
// Use native promises
mongoose.Promise = global.Promise;

// define Schema
const Schema = mongoose.Schema;   
const NoteSchema = new mongoose.Schema({
    note: {type: String, required: true, unique: true, minlength: 3 }
}, {timestamps: true });

// set our model by passing his Schema
mongoose.model('Note', NoteSchema);

// store our model in variable
const Note = mongoose.model('Note');



// - - - - = = = = Controller = = = = - - - - 
const noteController = {
    index: (request, response) => {
  
      Note.find({}).sort( { createdAt: -1 } )
        .then(notes => response.json(notes))
        .catch(error => console.log(error));
  
    },
    create: (request, response) => {
  
      Note.create(request.body)
        .then(note => response.json(note))
        .catch(error => console.log(error));
  
    }
  };


// - - - - = = = = Routes = = = = - - - - 
// route for getting / creatting 
app
.get('/notes', noteController.index)
.post('/notes', noteController.create)
.all("*", (request, response, next) => { 
    response.sendFile(path.resolve("./public/dist/index.html"))
});

// listen to port 
app.listen(port, function() {
  console.log("listening on port ", port);
});