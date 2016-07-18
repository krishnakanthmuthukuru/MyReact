var movieList = [];
var Movie = React.createClass({

  render: function(){
  return(
    <div>
        <MovieHead />
        <MovieBody  text = ""/>
    </div>
  )
  }
})

var MovieHead = React.createClass({
  render : function() {
    return(
      <div >
            <div className="jumbotron" style = {{fontFamily : 'Lobster', fontStyle : 'cursive', textAlign : 'center', backgroundColor : "#ff6600"}}>
                <h1 id = "title" style = {{color: "#ffffff"}}>Movie Database</h1>
            </div>
      </div>
    )
  }
});
var MovieBody = React.createClass({
      getInitialState: function() {
          return {text : '' ,data :[], db : "localDB"};
        },
      onChange : function(e){

      this.setState({text : e.target.value});
      },

      render: function(){
        return (
          <div className = "container-fluid">
                <div className ="col-xs-3">
                      <button className ="btn btn-primary dropdown-toggle" type="button" id= "menu1" data-toggle = "dropdown">
                      {this.state.db}<span className ="caret" ></span></button>
                      <ul className = "dropdown-menu" role ="menu">
                        <li className = "dropdown-header"><strong>select from list</strong></li>
                        <li className = "divider"></li>
                        <li> <a href = "#" onClick ={this.setDB}>Local DB</a></li>
                        <li> <a href = "#" onClick ={this.setDB}>OMDB</a></li>
                      </ul>
                </div>
                <div className = "col-xs-4" style = {{marginLeft : 350}}>
                    <input className = "form-control input-lg" id = "text" type = "text" placeholder = "Please enter movie name" onChange = {this.onChange} value = {this.state.text} />
                </div>
                <div className = "col-xs-2">
                    <button className = "form-control input-lg btn btn-success"  type = "submit" onClick = {this.searchOMDB}>Search<span className = "glyphicon glyphicon-search" style = {{paddingLeft : 10}}></span></button>
                </div>

                <div>
                   <MovieHistory db = {this.state.db}/>
                </div>
          </div>
        );
        },
        setDB : function (e){
          this.setState({movieList : []});
          this.setState({db:e.target.text});
        },
    searchOMDB : function(){
      var da=this.state.db;
      console.log(da);
      if(da == "OMDB"){
      movieList = [];
    var x = "http://www.omdbapi.com/?s="+document.getElementById('text').value+"&r=json";
  }else{
    movieList = [];
    var x ="movies/add";
  }
    $.ajax({
        url : x,
        dataType : 'json',
        cache : false,
        success : function(data) {
          if(da = "OMDB"){
          data.Search.map(function(d){
              movieList.push(d);
          })
        }else{
          data.map(function(d){
            movieList.push(d);
          })
        }
        this.setState({data:data, text : ''});
        }.bind(this),
        error : function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
});
var MovieHistory = React.createClass({
              getInitialState : function(){
                return({tmpmovie:''});
              },

              render : function(){
                if(this.props.db == "OMDB"){
                var add = this;
                var s = this.state.tmpmovie;
                console.log(this.props.db);
                  console.log(this.props.db);
                    console.log(this.props.db);
              return(
                <div>
                  <div className="col-lg-12"  style = {{marginTop : 40}}>
                   {movieList.map(function(d){
                     return (<div className="col-lg-12 well">
                                       <div className="col-lg-3">
                                            <img src={d.Poster} alt="No Poster Available" width = "300px"/>
                                       </div>
                                      <div className="col-lg-9">
                                          <h1 >{d.Title}</h1>
                                          <h4>Year : {d.Year}</h4>
                                          <br/>
                                          <button className="btn btn-info" data-target = "#mymodal" data-toggle="modal" onClick = {add.viewMovie}type="submit" value = {d.imdbID}>Wanna this movie details!!!</button>
                                      </div>
                              </div>);
                   })}
                  </div>
                  <div className = "modal fade" id = "mymodal" >
                    <div className = "modal-dialog" style = {{width : "90%"}}>
                  <div className = "modal-content">
                    <div className = "modal-header">
                          <button className="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">{s.Title}</h4>
                    </div>
                    <div className="modal-body">
                      <div className="row well">
                         <div className="col-lg-3">
                            <img src = {s.Poster} alt ="No poster Available"/>
                         </div>
                         <div className="col-lg-9">
                              <h1>{s.Title}</h1>
                              <h4>Year : {s.Year}</h4>
                              <br/>
                              <h4>Actors : {s.Actors}</h4>
                              <br/>
                              <h4>Director : {s.Director}</h4>
                              <br/>
                              <h4>{s.Plot}</h4>
                              <br/>
                                <span className="glyphicon glyphicon-calendar"></span>
                                <span><b>{s.Released}</b></span>
                                <span> | </span>
                                <span><b>Ratings :{s.Ratings} </b></span>
                                <span> | </span>
                                <span><b>Awards : {s.Awards}</b></span>
                         </div>
                         <div>
                          <button type="button" className="btn btn-info" data-dismiss="modal" style = {{marginTop : 50, marginLeft : 50}} onClick = {this.addToDB}>Add to DB</button>
                         </div>
                      </div>
                    </div>
                    <div className = "modal-footer">
                    <br/>
                       <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                  </div>
              </div>
            </div>
                  </div>
                )
                }else{
                  var add = this;
                  var s = this.state.tmpmovie;
                  console.log(this.props.db);
                    console.log(this.props.db);
                      console.log(this.props.db);
                return(
                  <div>
                    <div className="col-lg-12"  style = {{marginTop : 40}}>
                     {movieList.map(function(d){
                       return (<div className="col-lg-12 well">
                                         <div className="col-lg-3">
                                              <img src={d.Poster} alt="No Poster Available" width = "300px"/>
                                         </div>
                                        <div className="col-lg-9">
                                            <h1 >{d.Title}</h1>
                                            <h4>Year : {d.Year}</h4>
                                            <br/>
                                            <button className="btn btn-warning" data-target = "#mymodal" data-toggle="modal" onClick = {add.updateMovie}type="submit" value = {d.imdbID}>update</button>
                                            <button className="btn btn-info" data-target = "#mymodal" data-toggle="modal" onClick = {add.viewMovie}type="submit" value = {d.imdbID}>view</button>
                                            <button className="btn btn-danger"  onClick = {add.deleteMovie}type="submit" value = {d.imdbID}>delete</button>
                                        </div>
                                </div>);
                     })}
                    </div>
                    <div className = "modal fade" id = "mymodal" >
                      <div className = "modal-dialog" style = {{width : "90%"}}>
                    <div className = "modal-content">
                      <div className = "modal-header">
                            <button className="close" data-dismiss="modal">&times;</button>
                              <h4 class="modal-title">{s.Title}</h4>
                      </div>
                      <div className="modal-body">
                        <div className="row well">
                           <div className="col-lg-3">
                              <img src = {s.Poster} alt ="No poster Available"/>
                           </div>
                           <div className="col-lg-9">
                                <h1>{s.Title}</h1>
                                <h4>Year : {s.Year}</h4>
                                <br/>
                                <h4>Actors : {s.Actors}</h4>
                                <br/>
                                <h4>Director : {s.Director}</h4>
                                <br/>
                                <h4>{s.Plot}</h4>
                                <br/>
                                  <span className="glyphicon glyphicon-calendar"></span>
                                  <span><b>{s.Released}</b></span>
                                  <span> | </span>
                                  <span><b>Ratings :{s.Ratings} </b></span>
                                  <span> | </span>
                                  <span><b>Awards : {s.Awards}</b></span>
                           </div>
                           <div>
                            <button type="button" className="btn btn-info" data-dismiss="modal" style = {{marginTop : 50, marginLeft : 50}} onClick = {this.addToDB}>Add to DB</button>
                           </div>
                        </div>
                      </div>
                      <div className = "modal-footer">
                      <br/>
                         <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                </div>
              </div>
                    </div>
                  );
                }
              }
              ,
                  viewMovie:function(e){

                    var x = "http://www.omdbapi.com/?i="+e.target.value+"&plot=short&r=json";
                    $.ajax({
                        url : x,
                        dataType : 'json',
                        cache : false,
                        success : function(data) {

                          this.setState({tmpmovie:data});
                        }.bind(this),
                        error : function(xhr, status, err) {
                        console.error(this.props.url, status, err.toString());
                        }.bind(this)
                      });
                  },
                  addToDB : function(){
                  var x= "movies/add";
                  $.ajax({
                        url : x,
                        dataType : 'json',
                        type : "POST",
                        cache : false,
                        data : this.state.tmpmovie,
                        success : function(d){
                          console.log("Added successfully");
                        }.bind(this),
                        error : function(xhr, status, err) {
                        console.error(this.props.url, status, err.toString());
                        }.bind(this)
                      });
                  }
              });
ReactDOM.render(<Movie />,document.getElementById('content'));
