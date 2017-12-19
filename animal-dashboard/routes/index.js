module.exports = function Route(app){
	// root route to render the index.ejs view
	app.get('/', function(req, res) {
        let mongoose = require('mongoose');
        Animal = require('../models/animal_model.js');
        Animal.find({}).sort({animal_name: 1}).exec(function(err, animals) {
            if(err){
                res.render('erros', {errors: animals.errors})
            }
            else {
                console.log('animals in find index: ', animals);
                res.render("index", { animals: animals });
            }
        });
    });   
    
    app.get('/add', function(req, res) {
        res.render("new");
    }); 

    app.post('/new', function(req, res) {
        var mongoose = require('mongoose');
        var Animal = require('../models/animal_model.js');
        console.log("POST DATA", req.body);
        // create a new Animal corresponding to those from req.body
        var animal = new Animal({animal_name: req.body.name,
                                animal_breed: req.body.breed,
                                gender: req.body.gender,
                                age: req.body.age,
                                food: req.body.food });
        // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
        animal.save(function(err) {
          // if there is an error console.log that something went wrong!
          if(err){
            console.log('something went wrong');
            res.status(500).send(err);
          } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully added a new animal!');
            Animal.find({}).sort({animal_breed: 1}).exec(function(err, animals) {
                if(err){
                    res.render('erros', {errors: animals.errors})
                }
                else {
                    console.log('animals in find index: ', animals);
                    res.render("index", { animals: animals });
                }
            });
            }
         });
    });

    app.get('/edit/:id', function(req, res) {
        const Animal = require('../models/animal_model.js');
        Animal.findById({ _id: req.params.id }, function(err, animal) {
        // Handle any possible database errors
        if (err) {
            res.status(500).send(err);
        } 
        res.render("edit", { animal });
        });
    });

    app.post('/edit/:id', function(req, res) {
        Animal.findById(req.params.id, (err, animal) => {
            // Handle any possible database errors
            if (err) {
                res.status(500).send(err);
            } else {
            // update Animal corresponding to those from req.body
                animal.animal_breed = req.body.breed  || animal.animal_breed;
                animal.animal_name = req.body.name    || animal.animal_name;
                animal.gender = req.body.gender       || animal.gender;
                animal.age = req.body.age             || animal.age;
                animal.food = req.body.food           || animal.food;
                // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
                animal.save(function(err) {
                // if there is an error console.log that something went wrong!
                if (err) {
                    res.status(500).send(err)
                }
                res.redirect('/');
                });
            }
            });
    });
    
    app.get('/show/:id', function(req, res) {
        const Animal = require('../models/animal_model.js');
        Animal.findById({ _id: req.params.id }, function(err, animal) {
        // Handle any possible database errors
        if (err) {
            res.status(500).send(err);
        } 
        res.render("show", { animal });
        });
    });

    app.post('/destroy/:id', function(req, res) {
        Animal.findById(req.params.id, (err, animal) => {
            // Handle any possible database errors
            if (err) {
                res.status(500).send(err);
            } else {
                // destroy Animal corresponding to those from req.body
                animal.remove(function(err) {
                // if there is an error console.log that something went wrong!
                if (err) {
                    res.status(500).send(err)
                }
                res.redirect('/');
                });
            }
            });
    });
}
