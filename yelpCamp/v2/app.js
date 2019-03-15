var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")
    
    mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// schema setup
var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", function(req, res){
    res.render("home");
})

app.get("/campgrounds", function(req, res){
    // Get all campground from DB
    Campground.find({}, function(err,allCampground){
        if(err){
            console.log(err);
        } else{
            res.render("index", {campgrounds: allCampground});       
        }
    })
})

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    
    var newCampground = {name:name, image: image, description: desc};
    Campground.create(newCampground, function(err, campground){
    if(err){
        console.log(err);
    } else{
        res.redirect("/campgrounds");   
    }
});
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
})

// show Route
app.get("/campgrounds/:id", function(req, res) {
    // find the campground with provided  ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }   else{
            // render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    })
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp has started");
})