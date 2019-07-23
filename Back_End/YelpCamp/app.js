var express         = require("express");
var app             = express();
var bodyParser      = require("body-parser");
var mongoose        = require("mongoose");
var methodOverride  = require("method-override");
var Campground      = require("./models/campgrounds");
var Comment         = require("./models/comment");
var seedDB          = require("./seeds");
var passport        = require("passport");
var expressSession  = require("express-session");
var LocalStrategy   = require("passport-local");
var User            = require("./models/user");

//PASSPORT CONFIG
app.use(expressSession({
    secret: "What is your pet name",
    resave: false, 
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//these methods read the session and takes data from the session and encode/un-encode it
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//APP CONFIG
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public")); //__dirname is the directory that the script is running
seedDB();

//own middleware
app.use((req, res, next) =>{
    res.locals.currentUser = req.user;
    next();
});


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
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//NEW ROUTE - show form to create new campground
app.get("/campgrounds/new", (req, res) =>{
    res.render("campgrounds/new");
});

//SHOW ROUTE - show the details about each campground
app.get("/campgrounds/:id", (req, res) => {
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
app.post("/campgrounds", (req, res) =>{
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;

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

// COMMENTS ROUTES
//NEW ROUTE - show form to create new comment

app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) =>{
    Campground.findById(req.params.id, (err, campground) =>{
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground: campground});
        }
    });
});

//CREATE ROUTE - add new comment to DB
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
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
                    //Save the comment to the database
                    campground.comments.push(comment);
                    campground.save();
                    //redirect to show page
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//AUTH ROUTES
//show register from
app.get("/register", (req, res) =>{
    res.render("register");
});

//handling user sign up
app.post("/register", (req, res) =>{
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) =>{
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/campgrounds");
        });
    });
});

//LOGIN ROUTE
//login form
app.get("/login", (req, res) =>{
    res.render("login");
});

//handling login
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) =>{
});

//logout route
app.get("/logout", (req, res) =>{
    req.logOut();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

const port = 3000 || process.env.PORT;
app.listen(port, () =>{
    console.log("Server connected");
});