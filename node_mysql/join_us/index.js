var express = require("express");
var mysql = require("mysql");
var bodyparser = require("body-parser")
var app = express();

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hamid242',  //your username
  database : 'join_us'         //the name of your db
});

app.get("/", function(req, res){
    var q = "SElECT COUNT(*) AS total FROM users";
    connection.query(q, function(error, results){
        if(error) throw error;
        var count = results[0].total;
        res.render('home', {data: count});
    });
});

app.post("/register", function(req, res){
    var person = {
        email: req.body.email
    };
    connection.query('INSERT INTO users SET ?', person, function(err, result){
        console.log(err);
        console.log(result);
        res.redirect("/");
    })
    
});


app.listen(8080, function () {
 console.log('App listening on port 8080!');
});