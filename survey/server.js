// Import express and path modules.
var express = require( "express");
var path = require( "path");
// Create the express app.
var app = express();
// Define the static folder.
app.use(express.static(path.join(__dirname, "./static")));
// Setup ejs templating and define the views folder.
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// Root route to render the index.ejs view.
require('./routes/index.js')(app);
// Start Node server listening on port 8000.
var server = app.listen(8000, function() {
    console.log("listening on port 8000");
   });
// 'io' variable and require socket    
var io = require('socket.io').listen(server);
// io.sockets.on line
io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    socket.on( "posting_form", function (data){
        console.log('Someone clicked a button!  Data: '  + data.name + data.location + data.language + data.comment);
        var data = { 
            user: {name: data.name, location: data.location, language: data.language, comment: data.comment},
            random: Math.floor(Math.random()*1000) + 1
        }
        console.log("data: ", data);
        io.emit('updated_message', data.user);
        io.emit('random_number', data.random);
    })
  })

 