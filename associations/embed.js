var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", { useNewUrlParser: true });

// post

var postSchema = new mongoose.Schema({
    title: String,
    content: String,
})

var Post = mongoose.model("Post", postSchema);
// user name email
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [postSchema]
})

var User = mongoose.model("User", userSchema);



// var newUser = new User({
//     name: "charli",
//     email: "charli@gmail.com"
// })

// newUser.posts.push({
//     title: "advantage of fruits",
//     content: "they are full of vitamins"
// })

// newUser.save(function(err,user){
//     if(err){
//         console.log(err);
//     }   else{
//         console.log(user);    
//     }
// })

// var newPost = new Post({
//     title: "reflections on apple",
//     content: "it is delicious"
// })

// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     }   else{
//         console.log(post);
//     }
// })


// User.findOne({name: "ali"}, function(err, user){
//     if(err){
//         console.log(err);
//     }   else{
//             user.posts.push({
//                 title: "book",
//                 content: "it is the best friend of man"
//             });
//             user.save(function(err, user){
//                 if(err){
//                     console.log(err);
//                 }   else{
//                     console.log(user);
//                 }
//             })
//          }
// })

