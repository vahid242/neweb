var express = require("express");

var app = express();

app.get("/s/:subredditName", function(req, res){
    var subreddit = req.params.subredditName;
    res.send("welcome to " + subreddit);
});

// (/)  = hi there
app.get("/", function(req, res){
    res.send("Hi there !");
});
// (/bye)  = goodbye
app.get("/bye", function(req, res){
    res.send("Goodbye");
});
//  (/dog)  = miow
app.get("/dog", function(req, res){
    res.send("Miow");
});

app.listen(process.env.PORT, process.env.IP);