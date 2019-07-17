var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var methodOverride   = require("method-override");

//APP CONFIG
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name:        String,
    image:       String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

//INDEX ROUTE - show all campgrounds
app.get("/", (req, res) =>{
    res.render("landingPage");
});

app.get("/campgrounds", (req, res) =>{
    //Get ALL CAMPGROUNDS FROM DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

//NEW ROUTE - show form to create new campground
app.get("/campgrounds/new", (req, res) =>{
    res.render("new");
});

//SHOW ROUTE - show the details about each campground
app.get("/campgrounds/:id", (req, res) => {
    //find the campground with provided ID
    Campground.findById(req.params.id, (err, foundCampground) =>{
        if(err){
            console.log(err);
        } else{
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
    
});

//CREATE ROUTE - add new campground to DB
app.post("/campgrounds", (req, res) =>{
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    // var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //Create a new campgrounds and save to DB
    Campground.create(newCampground, (err, newCreate)=>{
        if(err){
            console.log(err);
        }else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
    
});

const port = 3000 || process.env.PORT;
app.listen(port, () =>{
    console.log("Server connected");
});