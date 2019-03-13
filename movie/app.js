var express = require("express");
var app = express();
var request = require("request");

app.get("/result", function(req, res){
    request("http://aviation-edge.com/api/public/flights?key=3d1485-ac8dbe&flight[iataNumber]=17w", function(error, response, body){
        if(!error && response.statusCode == 200) {
            res.send(body);
        }
    })
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("it has started");
})