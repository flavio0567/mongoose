
// ===== SERVER.JS ======
// ======================
// This is the entry point of our server, it creates
// the all important express app, connects static paths,
// and requires our first modules.

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
var mongoose = require('mongoose');
// Use native promises
mongoose.Promise = global.Promise;

app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve('static')));

mongoose.connect('mongodb://localhost/quotes');

require('./routes/index.js')(app);

app.listen(8000, function() {
  console.log("listening on port 8000");
});