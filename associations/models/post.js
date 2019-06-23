var mongoose = require("mongoose");

// post
var postSchema = new mongoose.Schema({
    title: String,
    content: String,
})

module.exports = mongoose.model("Post", postSchema);
