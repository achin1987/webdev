var express         = require("express");
var app             = express();
var bodyParser      = require("body-parser");
var mongoose        = require("mongoose");
var methodOverride  = require("method-override");
var seedDB          = require("./seeds");
var passport        = require("passport");
var expressSession  = require("express-session");
var LocalStrategy   = require("passport-local");
var User            = require("./models/user");

var commentRoutes       = require("./routes/comments");
var authRoutes          = require("./routes/auth");
var campgroundsRoutes   = require("./routes/campgrounds");

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

//requiring routes
app.use("/", authRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

const port = 3000 || process.env.PORT;
app.listen(port, () =>{
    console.log("Server connected");
});