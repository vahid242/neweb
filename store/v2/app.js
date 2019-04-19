var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mysql        = require("mysql")
    
    
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hamid242', 
  database : 'online_store'   
});


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.render("home");
})

app.get("/clothing", function(req, res){
    res.render("clothing");
})

app.get("/clothing/men-clothing", function(req, res){
        var q = "SElECT * FROM goods";
        connection.query(q, function(error, results){
        if(error) throw error;
        var clothes = results;
        res.render("men-clothing", {clothes: clothes});
    });
        
})

// app.post("/clothing/men-clothing", function(req, res){
//     var neme : req.body.name;
//     var neme : req.body.image;
//     var newClothe = {name: name, image :image};
//     clothes.push(newClothe]);
//     res.redirect("/clothing/men-clothing");
// })

app.get("/clothing/men-clothing/new", function(req, res) {
    res.render("new");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
})