var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment    = require("./models/comment");
   var data = [
           {
                name: "yalda night",
                image: "https://m.ellaslist.com.au/system/articles/featured_images/000/002/240/original/summer_camp_for_adults.jpg?1504032697",
                description: "very good"   
           },
           {
                name: "park camp",
                image: "https://media-cdn.tripadvisor.com/media/photo-s/11/80/05/25/large-camping-area.jpg",
                description: "excellent"   
           },
           {
                name: "forest road",
                image: "https://i0.wp.com/scoutingmagazine.org/wp-content/uploads/2008/05/Summer-Camp.jpg?ssl=1",
                description: "uniqe"   
           },
       ]
    
function seedDB(){
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
            console.log("remove camps");
                // create new camps
            data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                }   else{
                    console.log("camp added");
                    // create new comments
                    Comment.create({
                        text: "it dosen't have good facilites",
                        author: "ali"
                    },function(err, comment){
                        if(err){
                            console.log(err);
                        }   else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("create new comment");
                        }
                    })
                }
            });    
        });
    });
} 

module.exports = seedDB;
    
