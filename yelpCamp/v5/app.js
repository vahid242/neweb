var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    passport    =require("passport"),
    LocalStrategy  = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")
    
    
seedDB();    
mongoose.connect("mongodb://localhost:27017/yelp_camp_v6", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
    secret: "hamid is my bro",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


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
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground: campground});;
        }
    })
})

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
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

// =============
// auth Route

// register route

app.get("/register", function(req, res){
    res.render("register");
})

app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");            
        });
    });
});


// login

app.get("/login", function(req, res){
    res.render("login");
})

app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "login"
}) ,function(req, res) {
})
    
// log out
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp has started");
});