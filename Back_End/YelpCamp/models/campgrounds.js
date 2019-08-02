var mongoose = require("mongoose");
var Comment  = require("./comment");


//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name:        String,
    price:       String,
    image:       String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }, 
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"  //refer to the model to be referenced
        }
    ]
});

campgroundSchema.pre('remove', async function(next){    // '=>' doens't work with 'this'
    try {
        await Comment.deleteOne({
            
            "_id": {
                $in: this.comments
            }
        });
        console.log("comments removed!!!");
    } catch(err) {
        next(err);
    }
});

module.exports = mongoose.model("Campground", campgroundSchema);