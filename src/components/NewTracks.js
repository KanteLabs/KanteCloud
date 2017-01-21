import React, { Component } from 'react';
import { client_id } from './config'
import SC from 'soundcloud';

let trackTitles = [];

class NewTracks extends Component{


		constructor(props){
		super(props);
		this.state = {value: []};

		this.handleChange = this.handleChange.bind(this);
		this.handleTrendingClick = this.handleTrendingClick.bind(this);
	};

	handleChange(event){
		this.setState({value: event.target.value});
		event.preventDefault();
	}

	handleTrendingClick(){
		SC.initialize({
  		client_id: client_id
		});

		SC.get('/tracks').then(function(tracks){
  		console.log('Latest track: ' + tracks[0].title);
  		for(var i = 0; i <tracks.length; i++){
  			trackTitles.push(tracks[i].title);
  		}
  		console.log(trackTitles);
		});
	}
		

	render(){
		return(
		<div className="trackViewer">
			<button onClick={this.handleTrendingClick}>Trending Tracks</button>
			<ul id="trackList"  onChange={this.handleChange} >
			</ul>
		</div>
		)
	};
};
export default NewTracks;