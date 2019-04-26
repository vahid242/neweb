var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    todoRoutes = require("./routes/todos"); 
    
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());   

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
    
app.get('/', function(req, res){
    res.sendFile("index.html");
})   

app.use('/api/todos', todoRoutes);
    
app.listen(process.env.PORT, function(){
    console.log("App is running on port " + process.env.PORT);
})