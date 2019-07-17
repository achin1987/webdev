var mongoose = require("mongoose");

//POST - TITLE , CONTENT
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
module.exports = mongoose.model("Post", postSchema);
