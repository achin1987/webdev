var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
    {
        name: "mountain bay",
        image: "https://pixabay.com/get/5fe8d1434852b108f5d084609620367d1c3ed9e04e50744f762c7dd79645c7_340.jpg",
        description: "blah blah blah"
    },
    {
        name: "easy camp",
        image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c732c78d2944ccd5a_340.jpg",
        description: "blah blah blah"
    },
    {
        name: "river camp",
        image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c732c78d2944ccd5a_340.jpg",
        description: "blah blah blah"
    }
]

function seedDB(){
    Comment.deleteMany({}, (err) =>{
        if(err){
            console.log(err);
        }
        console.log("removed comments!");
    });
    // Remove all campgrounds
    Campground.deleteMany({}, (err) =>{
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
    });
   
    // add a few campground
    data.forEach((seed)=>{
        Campground.create(seed, (err, campground)=>{
            if(err){
                console.log(err);
            } else{
                console.log("added a campground");
                Comment.create(
                    {
                        text: "This plcae is great but I wish it has a toilet",
                        author: "Achin"
                    }, (err, comment)=>{
                        if(err){
                            console.log(err);
                        } else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                        } 
                    }
                );
            }
        });
    });
    
}
module.exports = seedDB;
