const request = require('request');
const ejs = require('ejs');
const express = require('express');
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    res.render("Search");
});

app.get("/results", (req, res) =>{
    const query = req.query.search;
    const url = "http://www.omdbapi.com/?apikey=thewdb&s=" + query;

    request(url, (error, response, body)=>{
    if(!error && response.statusCode == 200){
        const data = JSON.parse(body);
        res.render("results", {data: data});
    }
    });
});

const port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log(`the movie API has started`);
});