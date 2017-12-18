module.exports = function Route(app){
	// root route to render the index.ejs view
	app.get('/', function(req, res) {
        res.render("index");
    });   
    
    app.post('/quotes', function(req, res) {
        var mongoose = require('mongoose');
        var User = require('../models/user_model.js');
        //  = mongoose.model('User')  // We are retrieving this Schema from our Models, named 'User'  
        console.log("POST DATA", req.body);
        // create a new User with the name and age corresponding to those from req.body
        var user = new User({name: req.body.name, quote: req.body.quote });
        // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
        user.save(function(err) {
          // if there is an error console.log that something went wrong!
          if(err) {
            console.log('something went wrong');
          } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully added a user!');
            // const data = {
			// name: req.body.name,
            // quote: req.body.quote,
            // createAt: req.body.createAt
            // }; 
            User.find({}).sort({quote: 1}).exec(function(err, users) {
                if(err){
                    res.render('erros', {errors: users.errors})
                }
                else {
                    console.log('users in find after insert: ', users);
                    res.render("quote", { users: users });
                }
            // console.log('after insert : ',  data);
            // res.render("quote", { users: data });
            });
          };
        });
    });
    
    app.get('/quotes', function(req, res) {
        var mongoose = require('mongoose');
        var User = require('../models/user_model.js');
        User.find({}).sort({quote: 1}).exec(function(err, users) {
            if(err){
                res.render('erros', {errors: users.errors})
            }
            else {
                console.log('users in find : ', users);
                res.render("quote", { users: users });
            };
        });
    });    
}
