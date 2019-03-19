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
    
var campgroundRoutes    = require("./routes/campgrounds"),    
    commentRoutes       = require("./routes/comments"),    
    indexRoutes         = require("./routes/index")    
    
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

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.get("/", function(req, res){
    res.render("home");
})




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp has started");
});