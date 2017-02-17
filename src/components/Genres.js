import React, { Component } from 'react';
import { genreTag, genreName } from './config';
import 'isomorphic-fetch';
import 'whatwg-fetch';

class Genres extends Component {
	constructor(props){
        super(props);
        
        //trackTitle will hold the names of the songs, and metadata as well
        this.state = {
        	value: '',
            trackTitle: []
        };
    };

	//Uses the value of the buttons name in order to conduct a search by that genre
	handleGenreClick = (event) => {
		let name = (event.target.name)
		let trackTitleBuffer = []

        event.preventDefault();

		fetch(genreTag + name, { method:"GET" })
    	.then(response => response.json())
    	.catch(error => console.log(error))
    	.then(json => {
        	json.collection.map(entity => trackTitleBuffer.push(entity.title))
        	this.setState({ trackTitle: trackTitleBuffer })
    	})
    	.catch(error => console.log(error))
    };

	render(){
		const { trackTitle, value } = this.state
		return(
		<div className="genreList">
			<button name={genreName[0]} onClick={ event =>this.handleGenreClick(event)}>Pop</button>
			<button name={genreName[1]} onClick={ event =>this.handleGenreClick(event)}>Hip-Hop</button>
			<button name={genreName[2]} onClick={ event =>this.handleGenreClick(event)}>Reggae</button>
			<button name={genreName[3]} onClick={ event =>this.handleGenreClick(event)}>R&B</button>
			<button name={genreName[4]} onClick={ event =>this.handleGenreClick(event)}>EDM</button>
			<button name={genreName[5]} onClick={ event =>this.handleGenreClick(event)}>Dubstep</button>
		</div>
		)
	}
}

export default Genres;

