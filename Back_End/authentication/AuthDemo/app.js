var express                 = require("express");
var bodyParser              = require("body-parser");
var mongoose                = require("mongoose");
var passport                = require("passport");
var LocalStrategy           = require("passport-local");
var expressSession          = require("express-session");
var User                    = require("./models/user");
var passportLocalMongoose   = require("passport-local-mongoose");

//APP CONFIG
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/AuthDemo", {useNewUrlParser: true});
mongoose.set("useFindAndModify", false);

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

//INDEX ROUTE
app.get("/", (req, res) =>{
    res.render("home");
});

app.get("/secret", isLoggedIn, (req, res) =>{
    res.render("secret");
});


//AUTH ROUTES
//SHOW SIGN UP FORM
app.get("/register", (req, res) =>{
    res.render("register");
});

//handling user sign up
app.post("/register", (req, res) =>{
    User.register(new User({username: req.body.username}), req.body.password, (err, user) =>{
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/secret");
        });
    });
});

//LOGIN ROUTES
//render login form
app.get("/login", (req, res) =>{
    res.render("login");
});

//login route
//milldeware: code that runs before the final call back function
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req, res) =>{
});

app.get("/logout", (req, res) =>{
    req.logOut();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, () =>{
    console.log("server connected");
});