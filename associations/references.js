var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2", { useNewUrlParser: true });

var Post = require("./models/post");
var User = require("./models/user");


// User.create({
//     name: "sara",
//     email: "sara@mail.ue"
// })

// Post.create({
//     title: "pasta",
//     content: "culture of itly"
// }, function(err, post){
//     User.findOne({email:"sara@mail.ue"}, function(err, foundUser){
//         if(err){
//             console.log(err);
//         }   else {
//             foundUser.posts.push(post);
//             foundUser.save(function(err, data){
//                 if(err){
//                     console.log(err);
//                 }   else{
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });

User.findOne({email: "sara@mail.ue"}).populate("posts").exec(function(err, user){
    if(err){
        console.log(err);
    }   else{
        console.log(user);
    }
})

