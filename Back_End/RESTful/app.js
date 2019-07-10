var express      = require("express"),
expressSanitizer = require("express-sanitizer"),
methodOverride = require("method-override"),
app          = express(),
bodyParser   = require("body-parser"),
ejs          = require("ejs"),
mongoose     = require("mongoose");

//APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); //to serve the custom stylesheet
app.set("view engine", "ejs");
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//SCHEMA SETUP/MONGOOSE CONFIG
var blogSchema = new mongoose.Schema({
    title:      String,
    image:      String,
    body:       String,
    created:    {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//RESTFUL ROUTE

app.get("/", (req, res) =>{
    res.redirect("/blogs");
});

app.get("/blogs", (req, res) =>{
    Blog.find({}, (err, blogs) =>{
        if(err){
            console.log(err);
        } else{
            res.render("index", {blogs: blogs});
        }
    });
});


// var port = 3000 || process.env.PORT;
app.listen(3000, () =>{
    console.log("Server connected");
});