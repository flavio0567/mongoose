// ===== SERVER.JS ======
// ======================
// This is the entry point of our server, it creates
// the all important express app, connects static paths,
// and requires our first modules.


const express       = require('express');
const app           = express();
const port          = process.env.PORT || 8000;
const morgan        = require('morgan');
const path          = require('path');
const bodyParser    = require('body-parser');
const session       = require('express-session');


app.use(session({
    saveUninitialized: true,
    resave: false,
    name: 'session',
    secret: 'thisIsSuperSekret'
  }));

// set morgan / parser
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static Directory
app.use(express.static(__dirname + '/recipie-app/dist'));

// ========= Models ============================== //

// define Schema variable
const mongoose = require('mongoose');
uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

// Use native promises
mongoose.Promise = global.Promise;

// Use Database with mongoose
mongoose.connect('mongodb://localhost/recipie', {
    useMongoClient: true, 
    autoIndex: false
  });
mongoose.connection.on('connected', () => console.log('connected to MongoDB'));
// mongoose.set('debug', true)
 // define recipie Schema
 const RecipieSchema = new mongoose.Schema({
    name: String,
    user: String,
    likes: Number,
    ingredients: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}]
    }, { timestamps: true }, 
       { autoIndex: false },
       { usePushEach: true }
);
 // define ingredient Schema
var IngredientSchema = new mongoose.Schema({
    _recipie: {type: Schema.Types.ObjectId, ref: 'Recipie'},
    ingredient: String,
    amount: String
   }, { timestamps: true }, 
      { autoIndex: false },
      { usePushEach: true }
);

// set our model by passing the Schema
mongoose.model('Recipie', RecipieSchema);
mongoose.model('Ingredient', IngredientSchema);

// store our models in variables
const Recipie = mongoose.model('Recipie');
const Ingredient = mongoose.model('Ingredient');

// ========= Controllers ============================== //

const recipieController = {
    index: (request, response) => {
        request.session.name = name;
        // console.log('session 1', request.session.name);
    },
    all: function(req, res) {
        Recipie.find({}).sort({ likes: -1 }).exec(function(err, recipies){
            if(err){
                console.log(err);
                res.json({message: 'You got an error' + err});
            }else{
                res.json(recipies);
            }
        })
    },
    new: function(req, res) {
        var recipie = new Recipie( { name: req.body.recipie.name, user: req.body.recipie.user, likes: 0 } );
        recipie.save(function(err){
            if(err) { 
                console.log('Error: ', err) 
            }else{
                req.session._id = recipie._id;
                console.log('Recipie inserted!', req.session._id);
                req.session.save;
                req.session.save(function(err) {
                    if (err) {
                        console.log('Error saving session to store', err);
                        return reject({}); // some error object
                    }
                    return res.json(req.session._id); // some success object
                });
            }
        });
    },
    edit: function(req, res) {
        Recipie.findOne({_id: req.body.id }, function(err, recipie){
            var ingredient = new Ingredient( { ingredient: req.body.ingredient.ingredient, amount: req.body.ingredient.amount } );
            ingredient._recipie = req.body.id;
            recipie.ingredients = recipie.ingredients.concat(ingredient);
            ingredient.save(function(err){
                if(err) { 
                    console.log('Error', err) 
                }else{      
                    recipie.save(function(err){
                        if(err) { 
                            console.log('Error', err) 
                        }else{
                            console.log('Ingredient inserted!');
                            return res.json(recipie);
                        }; 
                    });
                }
            });
        });
    },
    show: function(req, res) {
        let recipieId = req.session._id;
        // console.log('recipie id: ', recipieId);
        Recipie.findOne({_id: recipieId})
            .populate('ingredients')
            .then(recipie => res.json(recipie))
            .catch(error => console.log(error));
    },
    getRecipieById: function(req, res) {
        // console.log('getRecipieById: ', req.params.id);
        req.session._id = req.session._id;
        req.session.save;
        Recipie.findOne({_id: req.params.id})
        .populate('ingredients')
        .then(recipie => res.json(recipie))
        .catch(error => console.log(error));
    },
    likeRecipie: function(req, res) {
        // console.log('likeRecipie: ', req.params.id);
        Recipie.update({_id: req.params.id}, { $inc: { likes: 1 } })
        .then(recipie => res.json(recipie))
        .catch(error => console.log(error));
    }
};

// =========== routers ============================== //

// make '/' default route
app.get('/', function (req, res) {
    return res.redirect('/');
});

// route for getting / creatting 
app
.get('', recipieController.index)                            // 
.get('/all', recipieController.all)                          // Get all recipie
.get('/recipie', recipieController.show)                     // Get an specific recipie 
.get('/recipie/:id', recipieController.getRecipieById)       // Get an specific recipie    
.post('/new', recipieController.new)                         // Create a new recipie
.put('/recipie/update', recipieController.edit)              // Edit a recipie
.put('/recipie/like/:id', recipieController.likeRecipie)    // Like a recipie
.all("*", (req, res, next) => {      
    res.sendFile(path.resolve("./recipie/dist/index.html"))
});

// start server 
app.listen(port, function() {
  console.log("listening on port ", port);
});