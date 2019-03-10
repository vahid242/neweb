var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat-app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    status: String,
});

var Cat = mongoose.model("Cat", catSchema);

// var ali = new Cat({
//     name: "Lucy", 
//     age: 7,
//     status: "excellent"
// });

// ali.save(function(err, cat){
//     if(err){
//         console.log("SOMETHING WENT WRONG!")
//     } else{
//         console.log("WE JUST SAVE A CAT")
//         console.log(cat);
//     }
// });

// Cat.create({
//     name: "Lily", 
//     age: 8,
//     status: "good"
// }, function(err, cat){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(cat);
//     }
// });

Cat.find({}, function(err, cats){
    if(err){
        console.log("Error");
        console.log(err);
    }   else{
        console.log("ALL THE CATS");
        // console.log(cats);
    }    
});

