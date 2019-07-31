var Campground      = require("../models/campgrounds");
var Comment         = require("../models/comment");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login!");
    res.redirect("/login");
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    //is user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) =>{
            if(err){
                req.flash("error", "Comment not found...");
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
        req.flash("error", "You're not authorised for this action...");
        res.redirect("back");
    }
}

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    //is user logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) =>{
            if(err){
                req.flash("error", "Campground not found...");
                console.log(err);
                res.redirect("/campgrounds");
            } else{
                //does user own the campground, i.e. does the if not then redirect
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else{
                    req.flash("error", "You're not authorised for this action...");
                    res.redirect("back");
                }
            }
        });
    } else{
        res.redirect("back");
    }
}

module.exports = middlewareObj;