var express = require("express"),
    router = express.Router(),
    db = require("../models");
    
router.get('/', function(req, res){
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    })
});


router.post('/', function(req, res){
    db.Todo.create(req.body)
    .then(function(newtodo){
        res.status(201).json(newtodo);
    })
    .catch(function(err){
        res.send(err);
    })
})

router.get('/:todoId', function(req,res){
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo){
        res.json(foundTodo);
    })
    .catch(function(err){
        res.send(err);
    })
});

router.put('/:todoId', function(req,res){
    db.Todo.findByIdAndUpdate(req.params.todoId, req.body, {new: true})
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    })
});

router.delete('/:todoId', function(req,res){
    db.Todo.findByIdAndRemove(req.params.todoId)
    .then(function(){
        res.json({message: 'We deleted it!'});
    })
    .catch(function(err){
        res.send(err);
    })
});

module.exports = router;
