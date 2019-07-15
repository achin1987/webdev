var express      = require("express"),
expressSanitizer = require("express-sanitizer"),
methodOverride = require("method-override"),
app          = express(),
bodyParser   = require("body-parser"),
mongoose     = require("mongoose");

//APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
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
//INDEX ROUTE
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

//NEW ROUTE
app.get("/blogs/new", (req, res) =>{
    res.render("new");
});

//CREATE ROUTE
app.post("/blogs", (req, res) =>{
    //create blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    data = req.body.blog;
    Blog.create(data, (err, newBlog) =>{
        if(err){
            res.render("new");
        } else {
            //then redirect to index
            res.redirect("/blogs");
        }
    });
    
});

//SHOW ROUTE
app.get("/blogs/:id", (req, res) =>{
    // find the blog with provided id
    Blog.findById(req.params.id, (err, foundBlog) =>{
        if(err){
            res.redirect("/blogs");
        } else{
            res.render("show", {blog: foundBlog});
        }
    });
});

//EDIT ROUTE
app.get("/blogs/:id/edit", (req, res) =>{
    Blog.findById(req.params.id, (err, foundBlog) =>{
        if(err){
            res.redirect("/blogs");
        } else{
            res.render("edit", {blog: foundBlog});
        }
    });
    
});

//UPDATE ROUTE
app.put("/blogs/:id", (req, res) =>{
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) =>{
        if(err){
            res.redirect("/blogs");
        } else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//DELETE ROUTE
app.delete("/blogs/:id", (req, res) =>{
    Blog.findByIdAndRemove(req.params.id, (err) =>{
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs"); 
        }
    });
});

app.listen(3000, () =>{
    console.log("Server connected");
});