var express = require("express");
var app = express();

app.get("/", function(req, res){
	res.send("Hi There");
});

app.get("/bye", function(req, res){
	res.send("Goodbye!!");
});

app.get("/dog", function(req, res){
	res.send("MEOW!!!");
});

app.get("*", function(req, res){
	res.send("You're a star");
});

// Tell Express to listen for request(start server)
var port = 3000 || process.env.PORT;
app.listen(port, function(){
	console.log("server has started");
});

// STEPS TO 