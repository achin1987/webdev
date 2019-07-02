var express = require("express");
var app = express();

app.use(express.static("public")); // to tell express to use the contents of the public directory 
app.set("view engine", "ejs"); // to use ejs files without extensions

//ejs templates
app.get("/", function(req, res){
	res.render("home");
});

//ejs conditionals
app.get("/fallinlovewith/:thing", function(req, res){
	var thing = req.params.thing;
   	res.render("love", {thingVar: thing});
});

//ejs loops
app.get("/posts", function(req, res){
	var posts = [
		{title: "post 1", author: "suzi"},
		{title: "post 2", author: "suzi"},
		{title: "post 3", author: "suzi"}
	];
	res.render("posts", {post: posts});
});



var port = 3000 || process.env.PORT;
app.listen(port, function(){
	console.log("server running");
});