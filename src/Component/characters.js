import '../App.css';
import React, { Component } from 'react';

class Characteres extends Component {
    state = {
        loading: true,
        resultprople:[],
        people: [],
        count:1,
        char:{
            id:1,
            title:"ss",
        },
        movieDe:{
            Title:"eee",
            Rated: "PG-13",
            Released: "23 Jun 1989",
            Runtime: "126 min",
            Genre: "Action, Adventure",
            Director: "Tim Burton",
            Writer: "Bob Kane, Sam Hamm, Warren Skaaren",
            Actors: "Michael Keaton, Jack Nicholson, Kim Basinger",
            Plot: "The Dark Knight of Gotham City begins his war on crime with his first major enemy being Jack Napier, a criminal who becomes the clownishly homicidal Joker.",
            Language: "English, French, Spanish",
            Country: "United States, United Kingdom",
            Awards: "Won 1 Oscar. 9 wins & 26 nominations total",
            Poster: "https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg",
            Metascore: "69",
            imdbRating: "7.5",
            imdbVotes: "354,693",
            imdbID: "tt0096895",
        },
        result0:'',
        searchTerm:'',
        total:0,
        error:'',
        fav:[],
        comment:'',
        rate:0,
      };
    
    async componentDidMount() {
        const url = "http://www.omdbapi.com/?s=batman&apikey=5e6dd51&type=movie";
        // const url1 = "https://www.breakingbadapi.com/api/episodes"
        const response = await fetch(url);
        // const response1 = await fetch(url1);
        const data = await response.json();
        // const data1 = await response1.json();
        this.setState({resultprople:data,total:data.totalResults});
        // var temp = this.state.resultprople.slice(0,10)
        this.setState({people:data, loading: false });
      }
  nextHandler = () => {
    var increment = this.state.count +1
    let url3
    if(this.state.searchTerm === ''){
        url3 = "http://www.omdbapi.com/?s=batman&apikey=5e6dd51&type=movie&page="+increment
    }
    else{
        url3 = "http://www.omdbapi.com/?s="+this.state.searchTerm+"&apikey=5e6dd51&type=movie&page="+increment
    }
    this.setState({ count:increment }) 
    if(increment !==1){
        
    fetch(url3)
      .then(res => res.json())
      .then(
        (result) => {
            this.setState({resultprople:result,people:result})
        },
        (error) => {
        //   this.setState({
        //     resultprople:people
        //   });
        }
      )
        
    }
  }
  perviousHandler = () => {
    var decrement = this.state.count -1
    let url3
    this.setState({ count:decrement }) 
    if(this.state.searchTerm === ''){
        url3 = "http://www.omdbapi.com/?s=batman&apikey=5e6dd51&type=movie&page="+decrement
    }
    else{
        url3 = "http://www.omdbapi.com/?s="+this.state.searchTerm+"&apikey=5e6dd51&type=movie&page="+decrement
    }
    fetch(url3)
      .then(res => res.json())
      .then(
        (result) => {
            this.setState({resultprople:result,people:result})
        },
        (error) => {
        //   this.setState({
        //     resultprople:people
        //   });
        }
      )
  }

  quote(name){
    name = name.replace(" ", "+")
    const url3 = "https://www.breakingbadapi.com/api/quote?author="+name
    fetch(url3)
      .then(res => res.json())
      .then(
        (result) => {
            this.setState({quote:result})
        },
        (error) => {
          this.setState({
            quote:[]
          });
        }
      )
}

  modelHandler = (i) => {
    const url3 = "http://www.omdbapi.com/?t="+this.state.people.Search[i].Title+"&apikey=5e6dd51&plot=short"
    fetch(url3)
      .then(res => res.json())
      .then(
        (result) => {
            this.setState({movieDe:result})
        },
      )
  }
  fav=(e)=>{
    e.preventDefault();
    let nam = e.target.name;
    let value = e.target.value;
    this.setState({[nam]: value});
    console.log(value) 
  }
  modelfav=(i)=>{
    let data={
        id:i,
        title:this.state.people.Search[i].Title
    }
    this.setState({char:data})
  }
  addFav = (i) => {
    var afv = this.state.fav
    var add=[]
    var movie=this.state.people.Search[i]
    movie['comment'] = this.state.comment
    movie['rate'] = this.state.rate
    if(afv.length === 0){
        add.push(movie)
        this.setState({fav:add})
    }
    else{
        afv.push(movie)
        this.setState({fav:afv})
    }
  }
  search = (e) => {
      
        this.setState({searchTerm:e.target.value})
      
  }
  goSearch = () => {
    console.log(this.state.searchTerm)
    if(this.state.searchTerm ===''){
        const url3 = "http://www.omdbapi.com/?s=batman&apikey=5e6dd51&type=movie"
    fetch(url3)
      .then(res => res.json())
      .then(
        (result) => {
            console.log(result.Search)
            this.setState({resultprople:result,people:result,count:1,total:result.totalResults})
        },
        (error) => {
          this.setState({
            error:error
          });
        }
      )
    }
    else{
        var st = this.state.searchTerm;
        if(st.length >= 3)
        {   this.setState({error:''})
            const url3 = "http://www.omdbapi.com/?s="+this.state.searchTerm+"&apikey=5e6dd51&type=movie"
            fetch(url3)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.Search)
                    if(result.totalResults > 0){
                        this.setState({resultprople:result,people:result,count:1,total:result.totalResults,error:'',result0:''})
                    }
                    else
                    var s="No results found for your search '"+ this.state.searchTerm +"'"
                    this.setState({result0:s,error:''})
                    
                },
                (error) => {
                this.setState({
                    error:error
                });
                }
            )
        }
        else{
            var s="No results found for your search '"+ this.state.searchTerm +"'"
            this.setState({error:"Lenght of the search string should be minimum 3",result0:s})
        }
    }
  }  
  
  render() {
    const buttonNext =( 
        <button className="btn btn-info" onClick={this.nextHandler}>
            <b>Next</b>
            <span className="material-icons">navigate_next</span>    
        </button>);
    const buttonPrev = (
        <button className="btn btn-info" onClick={this.perviousHandler}>
            <span className="material-icons">navigate_before</span>
            <b>Previous</b>  
        </button>
    );
    const favorites=(
        <div className="row ml-0 mr-0">
            {this.state.fav.map((person,index) => (
                <div className="col-sm-6 d-flex align-items-stretch" key={person.imdbID}>
                    <div className="card flex-fill hover-card">
                        <div className="card-img-container">
                            <img className="card-img-top " width="100%" height="350" alt="Charachter" src={person.Poster}/>
                        </div>
                        <div className="card-body shadow">
                            <h3 className="card-title font-weight-bold text-truncate mb-0" style={{cursor: "pointer"}} title={person.Title ? person.Title : 'Character'}>
                                {person.Title ? person.Title : 'Character'}
                            </h3>
                            <div className="font-weight-light active-campaign-sport text-capitalize mb-2" style={{cursor: "pointer"}} title={person.Year	 ? person.Year	 : '0000'}>
                                {person.Year	 ? person.Year	 : '0000'}
                            </div>
                            <p className='mb-0'><b>Comment</b></p>
                            <div className="font-weight-light active-campaign-sport text-capitalize mb-2" style={{cursor: "pointer"}} title={person.comment	 ? person.comment	 : '0000'}>
                                {person.comment	 ? person.comment	 : 'Comment'}
                            </div>
                            <p className='mb-0'><b>Rating</b></p>
                            <div className="font-weight-light active-campaign-sport text-capitalize mb-2" style={{cursor: "pointer"}} title={person.rate	 ? person.rate	 : '0000'}>
                                {person.rate	 ? person.rate	 : '0000'}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
    if (this.state.loading) {
        return (
            <div className="text-center pt-5 pb-5">
                <div className="spinner-border text-primary"></div>
                <h6  className="font-weight-bold" >Please wait while fetching the data</h6>
            </div>
        )
      }
  
      const error=(
            <div className="text-center pt-5 pb-5">
                <h3 className="font-weight-bold" >No results, Refresh the page</h3>
                <span className="reload material-icons fs-2">
                replay_circle_filled
                </span>
            </div>
        );
        const content=(
            <div>
                <div className="row ml-0 mr-0">
                    {this.state.people.Search.map((person,index) => (
                    <div className="col-sm-3 col-md-6 col-lg-3 mt-4 d-flex align-items-stretch" key={person.imdbID}>
                        <div className="card flex-fill hover-card">
                            <div className="card-img-container">
                                <img className="card-img-top " width="100%" height="350" alt="Charachter" src={person.Poster}/>
                            </div>
                            <div className="card-body shadow">
                                <h3 className="card-title font-weight-bold text-truncate mb-0" style={{cursor: "pointer"}} title={person.Title ? person.Title : 'Character'}>
                                {person.Title ? person.Title : 'Character'}
                                </h3>
                                <div className="font-weight-light active-campaign-sport text-capitalize mb-2" style={{cursor: "pointer"}} title={person.Year	 ? person.Year	 : '0000'}>
                                {person.Year	 ? person.Year	 : '0000'}
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-info add text-white d-flex justify-content-between" data-bs-toggle="modal" data-bs-target="#favModal" onClick={() => this.modelfav(index)}>
                                        <span className="material-icons">
                                            add
                                        </span>
                                        <b>Favorites</b>  
                                    </button>
                                    <button className="btn btn-info text-white " data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.modelHandler(index)}>
                                        <b>View</b>  
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="buttonsrow">
                    <div>
                    {this.state.count === 1 ? '' : buttonPrev }
                    </div>
                    <div>
                        {this.state.count !== this.state.total? buttonNext : ''}
                    </div>
                </div>
            </div>
        )
      
    return (
        <div id="characters">
            <div className="container-sm">
                <div className="row ml-0 mr-0">
                    <div className="col-sm-8">
                        <h2>Movies</h2>
                    </div>
                    <div className="col-sm-4">
                        <form name="searchForm">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" 
                                placeholder="search" value={this.state.searchTerm} onChange={this.search}/>
                                <div className="input-group-append">
                                    <button className="btn btn-light" type="button" onClick={this.goSearch}>Go</button>
                                </div>
                            </div>
                            <span className='text-danger'>{this.state.error}</span>
                        </form>
                        <div className='d-flex justify-content-end'>
                            <button className="btn btn-info text-white d-flex justify-content-between" data-bs-toggle="modal" data-bs-target="#favlistModal">
                                <span className="material-icons">
                                    favorite
                                </span>
                                <b>View</b>  
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <p className='text-center'><b>{this.state.result0}</b></p>
                    {this.state.resultprople.Search.length >0 ? content:error}
                </div>
                <div className="modal fade" data-bs-backdrop="static" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="exampleModalLabel"><b>{this.state.movieDe.Title}</b></h4><br/>
                                <span></span>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row ml-0 mr-0">
                                    <div className="col-sm-6">
                                        <div className="card-img-container">
                                            <img className="card-img-top " width="100%" height="330" alt="Charachter" src={this.state.movieDe.Poster}/>
                                        </div> 
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="row ml-0 mr-0">
                                            <h3 className="modal-title mb-3" id="exampleModalLabel"><b>{this.state.movieDe.Title}</b></h3>
                                        </div>
                                        <div className="row ml-0 mr-0 mt-3">
                                            <h6 className="mb-0"><b>Director</b></h6> 
                                            <em>{this.state.movieDe.Director}</em>
                                        </div>
                                        <div className="row ml-0 mr-0 mt-3">
                                            <h6 className="mb-0"><b>Writer</b></h6>
                                            <em>{this.state.movieDe.Writer}</em>
                                        </div>
                                        <div className="row ml-0 mr-0 mt-3">
                                            <h6 className="mb-0"><b>Released</b></h6> 
                                            <em>{this.state.movieDe.Released}</em>
                                        </div>
                                        <div className="row ml-0 mr-0 mt-3">
                                            <h6 className="mb-0"><b>Rated</b></h6> 
                                            <em>{this.state.movieDe.Rated}</em>
                                        </div>
                                    </div>
                                </div>
                                <div className="row ml-0 mr-0">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Actors</th>
                                            <td>
                                                {this.state.movieDe.Actors}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Plot</th>
                                            <td>{this.state.movieDe.Plot}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Genre</th>
                                            <td>
                                                {this.state.movieDe.Genre}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Runtime</th>
                                            <td>
                                                {this.state.movieDe.Runtime}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Awards</th>
                                            <td>{this.state.movieDe.Awards}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Language</th>
                                            <td>{this.state.movieDe.Language}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">IMDBRating</th>
                                            <td>{this.state.movieDe.imdbRating}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">IMBDVotes</th>
                                            <td>{this.state.movieDe.imdbVotes}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">IMBDId</th>
                                            <td>{this.state.movieDe.imdbID}</td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" data-bs-backdrop="static" id="favModal" aria-labelledby="favModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="exampleModalLabel"><b>{this.state.char.title}</b></h4><br/>
                                <span></span>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h2>Add to Favorite</h2>
                                <form>
                                    <div className="form-group">
                                        <label>Comment</label>
                                        <input type="Text" className="form-control" placeholder="Enter comment" id="comment" name="comment" value={this.state.comment} onChange={this.fav}/>
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Rating</label>
                                        <input type="number" className="form-control" placeholder="Rate" id="rate" name='rate' min="0" max="10" value={this.state.rate} onChange={this.fav}/>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => this.addFav(this.state.char.id)}>Add to favorite</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" data-bs-backdrop="static" id="favlistModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="exampleModalLabel"><b>Favorites</b></h4><br/>
                                <span></span>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    {this.state.fav.length > 0 ? favorites:'No Favorites were added'}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default Characteres;