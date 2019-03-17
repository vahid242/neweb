var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      =require("./seeds"),
    Comment     = require("./models/comment");
    
seedDB();    
mongoose.connect("mongodb://localhost:27017/yelp_camp_v4", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.render("home");
})

app.get("/campgrounds", function(req, res){
    // Get all campground from DB
    Campground.find({}, function(err,allCampground){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds: allCampground});       
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
    res.render("campgrounds/new");
})

// show Route
app.get("/campgrounds/:id", function(req, res) {
    // find the campground with provided  ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

// a new route for write comments
app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground: campground});;
        }
    })
})

app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            res.redirect("/campgrounds");
        } else{
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    // associate comment and camp
                    campground.comments.push(comment);
                    campground.save();
                    // redirect to show page /campground/:id
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp has started");
});