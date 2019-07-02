var express = require("express");
var app = express();

app.get("/", function(req, res){
	res.send("Hi There, Welcome to my assignment");
});

app.get("/speak/:animal", function(req, res){
	var sound = {
		pig: "Oink",
		cow: "Moo",
		dog: "Woof Woof!"
	};
	var animalName = req.params.animal;
	var animalSpeak = sound[animalName];
	res.send("The " + animalName + " says " + "'" + animalSpeak + "'");
});

app.get("/repeat/:str/:num", function(req, res){

	var number = parseInt(req.params.num);
	var message = req.params.str;
	var result = "";
	for (var i = 0; i<number; i++){
		result += message + " ";
	}
	res.send("'" + result + "'");
});


app.get("*", function(req, res){
	res.send("The page not found");
});

var port = 3000 || process.env.PORT;
app.listen(port, function(){
	console.log("The server has started");
});