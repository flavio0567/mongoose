// ===== SERVER.JS ======
// ======================
// This is the entry point of our server, it creates
// the all important express app, connects static paths,
// and requires our first modules.

const bodyParser = require('body-parser');
      express = require('express');
      path = require('path');
      app = express();

// set views and parser
app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));
app.use(bodyParser.urlencoded({ extended: true }));

// define Schema variable
const mongoose = require('mongoose');
      Schema = mongoose.Schema;    
// Use native promises
mongoose.Promise = global.Promise;

// Use Database with mongoose
mongoose.connect('mongodb://localhost/messages');

// define Message Schema
const MessageSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 4 },
    message: {type: String, required: true }, 
    _comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true });

 // define Comment Schema
const CommentSchema = new mongoose.Schema({
    _message: {type: Schema.Types.ObjectId, ref: 'Message'},
    name: {type: String, required: true, minlength: 4 },
    text: {type: String, required: true }
   }, {timestamps: true });  

// set our models by passing them their respective Schemas
mongoose.model('Message', MessageSchema);
mongoose.model('Comment', CommentSchema);

// store our models in variables
const Message = mongoose.model('Message');
const Comment = mongoose.model('Comment');

// route for getting messages and comments
app.get('/', function (req, res){
    Message.find({}, false, true)
    .populate('_comments')
    .exec(function(err, messages) {
        console.log('messages.comments: ', messages);
         res.render('message', {messages: messages});
    });
});

// route for creating one message
app.post('/', function (req, res){
    console.log("POST DATA", req.body);
    // create a new message corresponding to those from req.body
    Message.create(req.body, function(err, message) {
    // if there is an error console.log that something went wrong!
    if(err){
        console.log('something went wrong');
        res.status(500).send(err);
    } else { // else console.log that we did well and then redirect to the root route
        console.log('successfully added a new message');
        res.redirect('/');
    }
    });
});

// route for creating one comment with the parent message id
app.post("/:id", function(req, res) {
	const messageId = req.params.id;
	Message.findOne({ _id: messageId }, function(err, message) {
		const newComment = new Comment({ name: req.body.name, text: req.body.comment });
		newComment._message = message._id;
		Message.update({ _id: message._id }, { $push: { _comments: newComment }}, function(err) {

		});
		newComment.save(function(err) {
			if (err) {
				console.log(err);
				res.render('index.ejs', { errors: newComment.errors });
			} else {
				console.log("comment added");
				res.redirect("/");
			}
		});
	});
});

// app.post('/:id', function (req, res){
//     const messageId = req.params.id;
//     Message.findOne({_id: messageId}, function(err, message){
//         // data from form on the front end
//         let newComment = new Comment({ name: req.body.name, comment: req.body.comment });
//         console.log("newcomment before insert: ", newComment);
//         //  set the reference
//         messageId._message = message._id;
//         // now save both to the DB
        // Message.update({ _id: message._id }, { $push: { _comments: newComment }}, function(err) {});
        // newComment.save(function(err) {
        //     if(err) { 
        //         console.log('Error', err);
        //         res.render('message', { errors: newComment.errors }); 
        //     } else { 
        //         console.log("comment inserted", newComment);
        //         res.redirect('/'); 
        //     }
        // });
//     });
// });
// listen to port 8000
app.listen(8000, function() {
  console.log("listening on port 8000");
});