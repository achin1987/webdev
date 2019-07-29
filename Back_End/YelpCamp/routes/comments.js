var express         = require("express");
var router          = express.Router({mergeParams: true});   //mergeParams merge the params from different files
var Campground      = require("../models/campgrounds");
var Comment         = require("../models/comment");


// NEW ROUTE - show form to create new comment
router.get("/new", isLoggedIn, (req, res) =>{
    Campground.findById(req.params.id, (err, campground) =>{
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground: campground});
        }
    });
});

// CREATE ROUTE - add new comment to DB
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

// EDIT ROUTE
router.get("/:comment_id/edit", checkCommentOwnership, (req, res) =>{
    Comment.findById(req.params.comment_id, (err, foundComment)=>{
        if(err){
            res.redirect("back");
        } else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

// UPDATE ROUTE
router.put("/:comment_id", checkCommentOwnership, (req, res) =>{
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment)=>{
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY ROUTE
router.delete("/:comment_id", checkCommentOwnership, (req, res) =>{
    Comment.findByIdAndRemove(req.params.comment_id, (err, foundComment) =>{
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCommentOwnership(req, res, next){
    //is user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) =>{
            if(err){
                console.log(err);
                res.redirect("back");
            } else{
                //does user own the comment, if not then redirect
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else{
                    res.redirect("back");
                }
            }
        });
    } else{
        res.redirect("back");
    }
}

module.exports = router;