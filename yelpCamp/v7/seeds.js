var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment    = require("./models/comment");
   var data = [
           {
                name: "yalda night",
                image: "https://m.ellaslist.com.au/system/articles/featured_images/000/002/240/original/summer_camp_for_adults.jpg?1504032697",
                description: "Situated between the Rocky Mountains and British Columbia’s central plateau, and running alongside river valleys and lakes, the coniferous Columbia Forest Region resembles the coast region in its makeup, albeit with fewer species. Throughout the region western red cedar and western hemlock mingle with Douglas-fir, while in the southern reaches grand fir, western yew and others are found. "   
           },
           {
                name: "park camp",
                image: "https://media-cdn.tripadvisor.com/media/photo-s/11/80/05/25/large-camping-area.jpg",
                description: "The Montane Forest Region covers British Columbia’s central plateau, a portion of the Kootenays, and several valleys near the Alberta border. Trees commonly found in the region are Douglas-fir, lodgepole pine and trembling aspen; white spruce is often found in cooler locations such as shaded valleys. Ponderosa pine can be found in the region’s southern reaches while to the north are species such as Engelmann spruce, alpine fir and western white birch. "   
           },
           {
                name: "forest road",
                image: "https://i0.wp.com/scoutingmagazine.org/wp-content/uploads/2008/05/Summer-Camp.jpg?ssl=1",
                description: "This region covers Nova Scotia, Prince Edward Island and most of New Brunswick. Its makeup most closely resembles that of the Great Lakes-St Lawrence region, with beech, red oak, white elm all common to the region. Also found are black spruce, balsam fir, yellow birch, sugar maple and the trembling aspen, which is also common to the Subalpine and Boreal Forest Regions."   
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
    
