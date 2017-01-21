import React, { Component } from 'react';
import { client_id, genreTag } from './config';
import 'isomorphic-fetch';
import 'whatwg-fetch';
import SC from 'soundcloud';

class Genres extends Component {
	handleGenreClick = (pop) => {
        event.preventDefault();

		fetch(genreTag + event.value, { method:"GET" })
    	.then(response => response.json())
    	.catch(error => console.log(error))
    	.then(json => {
        	console.log(json);
    	}).catch(error => console.log(error))
    };

	render(){
		return(
		<div className="genreList">
			<button onClick={ event =>this.handleGenreClick(event)}>Pop</button>
			<button onClick={ event =>this.handleGenreClick(event)}>Hip-Hop</button>
			<button>Reggae</button>
			<button>R&B</button>
			<button>EDM</button>
			<button>Dubstep</button>
			<div id="trackViewer">
                 <ul></ul>
            </div>
		</div>
		)
	}
}

export default Genres;