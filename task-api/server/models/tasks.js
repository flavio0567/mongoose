// ===== TASK.JS      ======
// ===== date:         ======
//
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const taskchema = new Schema({
    title: {
        type: String,
        trim: true,
        require: [true, 'Title is required'],
        minlength: [5, 'Title length must be greater then 5'],
        unique: true
    },
    description: {
        type: String,
        trim: true,
        require: [true, 'Description is required'],
        minlength: [5, 'Description length must be greater then 5'],
        unique: true
    },
    completed: {
        type: String,
        default: false
    }
},{ timestamps: true });

const Task = mongoose.model('Task', taskchema);