var express = require("express");
var app = express();
var request = require('request');

app.get("/result", function(req, res){
    request("http://aviation-edge.com/v2/public/flights?key=3d1485-ac8dbe&flightIata=17W", function(error, response, body){
        if(!error && response.statusCode == 200) {
            res.send(body);
        }
    })
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("it has started");
})