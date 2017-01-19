import React, { Component } from 'react';
import { client_id } from './config'
import 'whatwg-fetch';
import SC from 'soundcloud';
import ReactDOM from 'react-dom';

var query = ["kanye"];
let search = "https://api.soundcloud.com/tracks?linked_partitioning=1&client_id="+ client_id +"&limit=50&offset=0&q="+query;
let tags = "https://api.soundcloud.com/tracks?linked_partitioning=1&client_id="+ client_id +"&limit=50&offset=0&tags=deep%20house";



class Search extends Component{
	
	constructor(props){
		super(props);
		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
	};

	handleChange(event){
		this.setState({value: event.target.value});
		event.preventDefault();
	}

	handleSearchSubmit(){
		query = this.state.value;
		SC.initialize({
  		client_id: client_id
		});

		//SC.get('/users/6969243/tracks').then(function(tracks){
  		//console.log('Latest track: ' + tracks[0].title);
  		//console.log(tracks);
		//});

		SC.get('/tracks' + query).then(function(tracks){
  		console.log('Latest track: ' + tracks[0].title);
  		console.log(tracks);
		});

		/*fetch(search + query,{
			method:"GET"
		}).then(function(response){
			console.log(response.json)
		}, function(error){
			console.log("Failed to get data")
		})*/
	}
		

	render(){
		return(
			<form>
			<input type="text" value={this.state.value} placeholder="Enter a Artist, Song, or Album.." onChange={this.handleChange}/>
			<input value="Update" onClick={this.handleSearchSubmit} />
			<p id="SearchTest" className="SearchTest">Live texting update: {this.state.value}</p>
			</form>
		)
	};
};
export default Search;