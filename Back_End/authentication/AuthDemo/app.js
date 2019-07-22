var express                 = require("express");
var bodyParser              = require("body-parser");
var mongoose                = require("mongoose");
var passport                = require("passport");
var passportLocal           = require("passport-local");
var passportLocalMongoose   = require("passport-local-mongoose");
var expressSession          = require("express-session");

//APP CONFIG
var app = express();
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/AuthDemo", {useNewUrlParser: true});
mongoose.set("useFindAndModify", false);


app.get("/", (req, res) =>{
    res.render("home");
});

app.get("/secret", (req, res) =>{
    res.render("secret");
});

app.listen(3000, () =>{
    console.log("server connected");
});