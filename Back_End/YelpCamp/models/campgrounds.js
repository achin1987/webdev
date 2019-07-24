var mongoose = require("mongoose");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name:        String,
    image:       String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"  //refer to the model to be referenced
        }
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema);