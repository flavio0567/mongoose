// ===== API1955.JS      ======
// ===== date:         ======
//
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const api1955Schema = new Schema({
    name: {
        type: String,
        trin: true,
        require: [true, 'Nome is required'],
        minlength: [5, 'Nome length must be greater then 5'],
        unique: true
    }
},{ timestamps: true });

const Api1955 = mongoose.model('Api1955', api1955Schema);