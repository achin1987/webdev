var express         = require("express");
var router          = express.Router();
var Campground      = require("../models/campgrounds");
var middleware      = require("../middleware"); // as the file name is index.js


//INDEX ROUTE - show all campgrounds
router.get("/", (req, res) =>{
    //Get ALL CAMPGROUNDS FROM DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//NEW ROUTE - show form to create new campground
router.get("/new", middleware.isLoggedIn, (req, res) =>{
    res.render("campgrounds/new");
});

//SHOW ROUTE - show the details about each campground
router.get("/:id", (req, res) => {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) =>{
        if(err){
            console.log(err);
        } else{
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
});

//CREATE ROUTE - add new campground to DB
router.post("/", middleware.isLoggedIn, (req, res) =>{
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }

    var newCampground = {name: name, price: price, image: image, description: desc, author: author};
    
    //Create a new campgrounds and save to DB
    Campground.create(newCampground, (err, newCreate)=>{
        if(err){
            console.log(err);
        }else {
            //redirect back to campgrounds page
            console.log(newCreate);
            req.flash("success", "Campground created successfully!");
            res.redirect("/campgrounds");
        }
    });
});

//EDIT ROUTE - edit a campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) =>{
    Campground.findById(req.params.id, (err, foundCampground) =>{
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//UPDATE ROUTE - update the edited campground
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) =>{
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) =>{
        if(err){
            res.redirect("/campgrounds");
        } else{
            //redirect to showpage
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY ROUTE - delete a campground
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) =>{
    Campground.findByIdAndRemove(req.params.id, (err, campground) =>{
        if (err){
            return next(err);
        } else{ 
            req.flash("error", "Campground deleted successfully!");
            res.redirect("/campgrounds");
        }   
    });
});

module.exports = router;