
var express = require("express");
 var app = express();
 
app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
})
// animal voice
app.get("/speak/:animal", function(req, res){
        var animal = req.params.animal;
        var sounds = {
            pig: "Oink",
            cow: "moo",
            dog: "woof woof",
        }
        var sound = sounds[animal];
        res .send("the " + animal + " says " + sound );
    })
    // reapet
 app.get("/repeat/:message/:times", function(req, res){
        var message = req.params.message;
        var times = Number(req.params.times);
        var result= "";
        for(var i=0; i < times; i++){
            result +=message + " ";
        }
        res.send(result);
    })

 
 app.get("*", function(req, res){
     res.send("Sorr, page not found...")
 })
 app.listen(process.env.PORT, process.env.IP);