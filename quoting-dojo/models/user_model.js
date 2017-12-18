let mongoose = require('mongoose');
var Schema = mongoose.Schema;    
    
let UserSchema = new Schema({
    name: { type: String, required: 'Name cannot be blank', minlength: 6 },
    quote: { type: String, required: true },
    createdAt: { type: Date, default: Date.now,
		required: 'Must have start date - default value is the created date' } 
    })

module.exports = mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
