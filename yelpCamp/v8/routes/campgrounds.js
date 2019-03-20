var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");

router.get("/", function(req, res){
    // Get all campground from DB
    Campground.find({}, function(err,allCampground){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds: allCampground});       
        }
    })
})

router.post("/", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name:name, image: image, description: desc, author: author};
    Campground.create(newCampground, function(err, campground){
    if(err){
        console.log(err);
    } else{
        console.log(campground);
        res.redirect("/campgrounds");   
    }
});
});

router.get("/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
})

// show Route
router.get("/:id", function(req, res) {
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

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;