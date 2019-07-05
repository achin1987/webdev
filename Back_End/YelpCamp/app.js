var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) =>{
    res.render("landingPage");
});

app.get("/campgrounds", (req, res) =>{
    var campgrounds = [
        {name: "Salmon creek", image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732d79d09544c35a_340.jpg"},
        {name: "Granite hill", image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c732d79d09544c35a_340.jpg"},
        {name: "mountain goats", image: "https://pixabay.com/get/54e6d0434957a514f6da8c7dda793f7f1636dfe2564c704c732d79d09544c35a_340.jpg"}
    ]

    res.render("campgrounds", {campgrounds: campgrounds});
});

const port = 3000 || process.env.PORT;
app.listen(port, () =>{
    console.log("Server connected");
});