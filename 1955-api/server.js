// ===== SERVER.JS ======
// =====           ======
// This is the entry point of our server, it creates
// the all important express app, connects static paths,
// and requires our first modules.
//
// Express
const express = require('express');
const app     = express();
const port    = process.env.PORT || 8000;

// Path
const path = require('path');

// Static Directory
// app.use(express.static(__dirname + '/client/dist'));

// Body Parser 
const parser = require('body-parser');
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(parser.text({type: 'text/xml' }));
app.use(parser.text({type: 'text/plain' }));

// Mongoose 
require('./server/config/mongoose.js');

// Routes
require('./server/config/routes.js')(app);

// Start server 
app.listen(port, function() {
    console.log("listening on port ", port);
  });
