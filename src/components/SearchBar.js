import React, { Component } from 'react';
import { client_id } from './config';
import 'isomorphic-fetch';
import 'whatwg-fetch';
import SC from 'soundcloud';
import ReactDOM from 'react-dom';

let query = [""];
let trackTitle = [];
let search = "https://api.soundcloud.com/tracks?&client_id="+ client_id +"&limit=50&offset=0&q="+query;
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
		event.preventDefault();

		SC.initialize({
  		client_id: client_id
		});

		fetch(search + query,{
			method:"GET"
		}).then(function(response){
			return response.json();
		}, function(error){
			console.log("Failed to get data")
		}).then(function(json) {
    		console.log('parsed json', json)
    		for (let i = 0; i <json.length; i++) {
    			trackTitle.push(json[i].title);
    		}
    		console.log(trackTitle)
    		const trackItems = trackTitle.map((titles) =>
    			<li>{titles}</li>
    		);
 		 }).catch(function(ex) {
    		console.log('parsing failed', ex)
  		});
	};

	render(){
		return(
			<form>
			<input type="text" value={this.state.value} placeholder="Enter a Artist, Song, or Album.." onChange={this.handleChange}/>
			<button type="button" onClick={this.handleSearchSubmit}>Search</button>
			<div id="trackViewer">
				 <p>Results for: {this.state.value}</p>
				 <ul>{this.trackItems}</ul>
			</div>
			</form>
		)
	};
};

export default Search;