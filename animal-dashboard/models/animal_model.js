const mongoose = require('mongoose');
      Schema = mongoose.Schema;    
      uniqueValidator = require('mongoose-unique-validator');

let AnimalSchema = new Schema({
    animal_name: { type: String, unique: true, required: 'Name cannot be blank' }, // minlength: 6 },
    animal_breed: { type: String, required: 'Breed cannot be blank' }, // minlength: 6 },
    gender: { type: String, required: 'Gender cannot be blank'}, // minlength: 6 },
    age: { type: Number, required: true }, // min: 1 },
    food: { type: String, required: 'Food cannot be blank'}, // minlength: 6 },
    createdAt: { type: Date, default: Date.now } 
    })
    
// Apply the uniqueValidator plugin to AnimalSchema.
    AnimalSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Animal', AnimalSchema); // We are setting this Schema in our Models as 'Animal'
