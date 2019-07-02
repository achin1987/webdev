var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var friends = ["tony", "miranda", "justin", "pierre", "lilly"];

app.get("/", function(req, res){
	res.render("home");
});

app.post("/addfriend", function(req, res){
	var newFriend = req.body.newfriend;
	friends.push(newFriend);
	res.redirect("/friends");
});

app.get("/friends", function(req, res){
	res.render("friends", {friends: friends});
});

var port = 3000 || process.env.PORT;
app.listen(port, function(){
	console.log("server running");
});