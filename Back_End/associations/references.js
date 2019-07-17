var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo_2", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

//POST - TITLE , CONTENT
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

//USER, EMAIL, NAME
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});
var User = mongoose.model("User", userSchema);

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Fisher"
// });

// Post.create({
//     title: "How to cook best pasta pt.3",
//     content: "da da da da da da"
// }, (err, post) =>{
//     User.findOne({email: "bob@gmail.com"}, (err, foundUser)=>{
//         if(err){
//             console.log(err);
//         } else{
//             foundUser.posts.push(post);
//             foundUser.save((err, data)=>{
//                 if(err){
//                     console.log(err);
//                 } else{
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });

//find the user
//find all posts for that user

User.findOne({email: "bob@gmail.com"}).populate("posts").exec((err, user)=>{
    if(err){
        console.log(err);
    } else{
        console.log(user);
    }
});