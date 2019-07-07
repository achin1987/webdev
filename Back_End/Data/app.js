var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// adding a new cat to the database
// var george = new Cat({
//                 name: "Norris",
//                 age: 7,
//                 temperament: "Evil"
//             });
// george.save((err, cat) =>{
//     if(err){
//         console.log("SOMETHING WENT WRONG");
//     } else {
//         console.log("WE SAVED THE CAT TO THE DATABASE");
//         console.log(cat);
//     }
// });

Cat.create({
    name: "Snow White",
    age: 5,
    temperament: "Grumpy"
    }, (err, cat) =>{
        if(err){
            console.log(err);
        } else{
            console.log(cat);
        }
});

//retrive all cats from database
Cat.find({}, (err, cats) =>{
    if(err){
        console.log("Oh NO, ERROR!");
        console.log(err);
    } else {
        console.log("All the CATS....");
        console.log(cats);
    }
});