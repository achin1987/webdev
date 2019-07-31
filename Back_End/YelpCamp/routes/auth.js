var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");

//Root route
router.get("/", (req, res) =>{
    res.render("landingPage");
});

//AUTH ROUTES
//show register from
router.get("/register", (req, res) =>{
    res.render("register");
});

//handling user sign up
router.post("/register", (req, res) =>{
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) =>{
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to Yelp Camp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//LOGIN ROUTE
//login form
router.get("/login", (req, res) =>{
    res.render("login");
});

//handling login
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) =>{
});

//logout route
router.get("/logout", (req, res) =>{
    req.logOut();
    req.flash("success", "Logout successfull!");
    res.redirect("/campgrounds");
});

module.exports = router;