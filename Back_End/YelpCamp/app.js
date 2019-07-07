var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);


app.get("/", (req, res) =>{
    res.render("landingPage");
});

app.get("/campgrounds", (req, res) =>{
    //Get ALL CAMPGROUNDS FROM DB
    Campground.find({}, (err, allCampgrounds)=>{
        if(err){
            console.log(err);
        } else{
            res.render("Campgrounds", {campgrounds: allCampgrounds});
        }
    });
});

app.get("/campgrounds/new", (req, res) =>{
    res.render("new.ejs");
});

app.post("/campgrounds", (req, res) =>{
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    //Create a new campgrounds ans save to DB
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