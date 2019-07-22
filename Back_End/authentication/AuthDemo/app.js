var express                 = require("express");
var bodyParser              = require("body-parser");
var mongoose                = require("mongoose");
var passport                = require("passport");
var passportLocal           = require("passport-local");
var expressSession          = require("express-session");
var User                    = require("./models/user");
var passportLocalMongoose   = require("passport-local-mongoose");

//APP CONFIG
var app = express();
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/AuthDemo", {useNewUrlParser: true});
mongoose.set("useFindAndModify", false);
app.use(passport.initialize());
app.use(passport.session());

app.use(expressSession({
    secret: "What is your pet name",
    resave: false, 
    saveUninitialized: false
}));

//these methods read the session and takes data from the session and encode/un-encode it
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", (req, res) =>{
    res.render("home");
});

app.get("/secret", (req, res) =>{
    res.render("secret");
});

app.listen(3000, () =>{
    console.log("server connected");
});