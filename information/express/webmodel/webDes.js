var express = require("express");
 var app = express();
 var bodyParser = require("body-parser");
 app.use(bodyParser.urlencoded({extended: true}));
 
 var friends = ["Tony", "Alix", "Gorge"]
 
 app.use(express.static("public"));
 app.set("view engine", "ejs");

  app.get("/", function(req, res){
    res.render("home");
})
app.post("/addfriend", function(req, res){
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
})

app.get("/friends", function(req, res){
    res.render("friends", {friends: friends});
})

app.get("/fallinlove/:name", function(req, res){
    var name = req.params.name;
    res.render("love", {nameItem: name});
})
app.get("/posts", function(req, res){
    var posts = [
            {title:"fall", author:"alix"},
            {title:"winter", author:"susy"},
            {title:"spring", author:"july"},
        ]
    res.render("posts", {posts: posts});
})

 
  app.listen(process.env.PORT, process.env.IP);
