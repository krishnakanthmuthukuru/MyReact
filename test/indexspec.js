var should = require("chai").should(),
supertest = require('supertest'),
app = require("../bin/www");

var url = supertest("http://localhost:8080");

describe("Testing the routes", function(err){
  it.only("should handle find movie by name and send the JSON data", function(done){
    url
        .get("/movies/findMovie/")
        .expect(404)
        .end(function(err,res){
          should.not.exist(err);
          //console.log(res.text);
          var myObj = res.body[0]._id;
          console.log(myObj);
          myObj._id.should.be.equal('577dd6312f9cd6c72d0df0d2');
          done();
        });
      });
      it("should handle delete movie and send the JSON data", function(done){
        url
            //.delete("/movies/deleteMovies/577a2bbbd401f2600a6c16b2")
            .delete("/movies/deleteMovies/577dd6312f9cd6c72d0df0d2")
            .expect(200)
            .end(function(err,res){
              should.not.exist(err);
              console.log(res.text);
              res.text.should.not.be.equal("deleted");
              done();
            });
          });
          it("should handle update movie and send the JSON data", function(done){
            url
                .put("/movies/updateMovie/577a2bbbd401f2600a6c16b2")
                .expect(200)
                .end(function(err,res){
                  should.not.exist(err);
                  var obj = res.body;
                  console.log(obj);
                  obj.Title.should.be.equal("AlluArjun");
                  done();
                });
              });
              it("should handle add movie and send the JSON data", function(done){
                url
                    .post("/movies/add")
                    .expect(200)
                    .send({
                          "Title": "Saw",
                          "Year": "2004",
                          "Rated": "R",
                          "Released": "29 Oct 2004",
                          "Runtime": "103 min",
                          "Genre": "Drama, Horror, Mystery",
                          "Director": "James Wan",
                          "Writer": "Leigh Whannell, James Wan (story), Leigh Whannell (story)",
                          "Actors": "Leigh Whannell, Cary Elwes, Danny Glover, Ken Leung",
                          "Plot": "Two strangers awaken in a room with no recollection of how they got there or why, and soon discover they are pawns in a deadly game perpetrated by a notorious serial killer.",
                          "Language": "English",
                          "Country": "USA",
                          "Awards": "8 wins & 10 nominations.",
                          "Poster": "http://ia.media-imdb.com/images/M/MV5BMjAyNTcxNzYwMV5BMl5BanBnXkFtZTgwMzQzNzM5MjE@._V1_SX300.jpg",
                          "Metascore": "46",
                          "imdbRating": "7.7",
                          "imdbVotes": "295,042",
                          "imdbID": "tt0387564",
                          "Type": "movie",
                          "Response": "True"
                        })
                      .end(function(err,res){
                      should.not.exist(err);
                      console.log(res.body.Title+ "MUni");
                      res.body.Title.should.be.equal("Saw");
                      done();
                    });
                  });
  });
