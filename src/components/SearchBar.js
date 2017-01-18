import React, { Component } from 'react';
import { client_id } from './config'
import 'whatwg-fetch';
import ReactDOM from 'react-dom';

var query = [];
let search = "http://api.soundcloud.com/tracks?linked_partitioning=1&client_id="+ client_id +"&limit=50&offset=0&q="+query;
let tags = "http://api.soundcloud.com/tracks?linked_partitioning=1&client_id="+ client_id +"&limit=50&offset=0&tags=deep%20house";



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
		fetch(search + query,).then(function(response){
			console.log(response)
		}, function(error){
			console.log("Failed to get data")
		})
	}
		

	render(){
		return(
			<form>
			<input type="text" value={this.state.value} placeholder="Enter a Artist, Song, or Album.." onChange={this.handleChange}/>
			<input value="Update" onClick={this.handleSearchSubmit} />
			<p id="SearchTest" className="SearchTest">You searched for {this.state.value}</p>
			</form>
		)
	};
};
export default Search;