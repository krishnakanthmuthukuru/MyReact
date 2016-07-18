var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Movies = require('../model/movieModel');
mongoose.connect('mongodb://localhost/test');

//adding movie in to db
router.post('/add', function(req, res){
  var data = new Movies(req.body);
  console.log(data);
  data.save(function(err,d){
    if(err){
      console.log(err);
    }else{
      console.log('Movie added succesfully');
      //console.log(d);
      res.send(d);
    }
  });
  //res.redirect('/list');
});

//display of all movies

router.get('/list',function(req, res){
  Movies.find({},function(err,d){
    if(err){
      console.log(err);
    }else{
      console.log('List of all movies');
      console.log(d);
      res.send(d);
    }
  });
});

//find movie by ID

router.get('/findMovies/:id',function(req,res){
  var id = req.params.id;
  Movies.findById(id, function(err, d){
    if(err){
      console.log(err);
    }else{
      console.log('Movie find by ID');
      console.log(d);
      res.send(d);
    }
  });
});
// finding by name
router.get('/findMovie/:name',function(req,res){
  var name = req.params.name;
  Movies.find({Title: name}, function(err, d){
    if(err){
      console.log(err);
    }else{
      console.log('Movie find by name');
      //console.log(d);

      res.json(d);
    }
  });
});

//delete Movies by ID

  router.delete('/deleteMovies/:name',function(req,res){
  var id = req.params.name;
  Movies.remove({_id:id}, function(err,d){
    if(err){
      console.log(err);
    }else{
     console.log('deleting movies by ID'+ id);
      //console.log(d);
      res.send("deleted"+id);
    }
  });
});

//updating movie by ID
router.put('/updateMovie/:id',function(req,res){
  var id = req.params.id;
  Movies.update({_id:id},{"Title" : "AlluArjun"},function(err,d){
    if(err){
      console.log(err);
    }
    else{
      console.log('updated movie is :'+ id);
      res.send("updated");
    }
  });
});

module.exports = router;
