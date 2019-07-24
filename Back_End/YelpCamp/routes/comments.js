var express         = require("express");
var router          = express.Router({mergeParams: true});   //mergeParams merge the params from different files
var Campground      = require("../models/campgrounds");
var Comment         = require("../models/comment");

// COMMENTS ROUTES
//NEW ROUTE - show form to create new comment
router.get("/new", isLoggedIn, (req, res) =>{
    Campground.findById(req.params.id, (err, campground) =>{
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground: campground});
        }
    });
});

//CREATE ROUTE - add new comment to DB
router.post("/", isLoggedIn, function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //create new comment and save to DB
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save the comment
                    comment.save();
                    //Save the comment to the database
                    campground.comments.push(comment);
                    campground.save();  //save the campground
                    console.log(comment);
                    //redirect to show page
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;