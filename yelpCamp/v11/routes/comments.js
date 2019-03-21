var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware")


// a new route for write comments
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground: campground});;
        }
    })
})

router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            res.redirect("/campgrounds");
        } else{
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                      // add username and id to comment

                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    // associate comment and camp
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    // redirect to show page /campground/:id
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// EDIT
// cam/id/comments/id/edit

router.get("/:comment_id/edit",middleware.checkCommentOwner, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            res.redirect("back");
        } else{
             res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    })
})

router.put("/:comment_id",middleware.checkCommentOwner, function(req, res){
 Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
        res.redirect("back");
    }     else{
        res.redirect("/campgrounds/" + req.params.id);
    }
 })
})

// delete comment
// camp/:id/comments/:id
router.delete("/:comment_id",middleware.checkCommentOwner, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});


module.exports = router;