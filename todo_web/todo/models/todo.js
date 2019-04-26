var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name cannot be blank'
    },
    completed:{
        type: Boolean,
        default: false
    },
    created_data:{
        type: Date,
        default: Date.now
    }
})

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;

// Todo.create({
//     name: "read book"
// })