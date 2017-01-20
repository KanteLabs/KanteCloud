import React, { Component } from 'react';
import { client_id } from './config'
import SC from 'soundcloud';
import ReactDOM from 'react-dom';

let trackTitles = [];
let tracks2 = [];
class TrendingTracks extends Component{
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
		tracks2 = this.state.value;
		SC.initialize({
  		client_id: client_id
		});

		SC.get('/tracks').then(function(tracks){
  		console.log('Latest track: ' + tracks[0].title);
  		for(var i = 0; i <tracks.length; i++){
  			trackTitles.push(tracks[i].title);
  		}
  		console.log(trackTitles);
  		this.state.value = trackTitles;
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
export default TrendingTracks;