var express         = require("express");
var router          = express.Router();
var Campground      = require("../models/campgrounds");


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
router.get("/new", isLoggedIn, (req, res) =>{
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
router.post("/", isLoggedIn, (req, res) =>{
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }

    var newCampground = {name: name, image: image, description: desc, author: author};
    
    //Create a new campgrounds and save to DB
    Campground.create(newCampground, (err, newCreate)=>{
        if(err){
            console.log(err);
        }else {
            //redirect back to campgrounds page
            console.log(newCreate);
            res.redirect("/campgrounds");
        }
    });
});

//EDIT ROUTE - edit a campground
router.get("/:id/edit", (req, res) =>{
    Campground.findById(req.params.id, (err, foundCampground) =>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
    
});
//UPDATE ROUTE - update the edited campground
router.put("/:id", (req, res) =>{
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

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;