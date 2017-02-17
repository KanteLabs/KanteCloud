import React, { Component } from 'react';
import SongList from '../components/SongList';
import {newTracks} from '../components/config';
import 'isomorphic-fetch';
import 'whatwg-fetch';

class SongListContainer extends Component {
	constructor() {
		super();
		this.state = { tracks: [] }
	}

	componentDidMount() {
		fetch(newTracks, { method:"GET" })
    	.then(response => response.json())
    	.catch(error => console.log(error))
    	.then(tracks => {	
        	//json.map(entity => tracks.push(entity.title))
        	this.setState({ tracks: tracks }) 	
        })
	}

	render() {
		return (
			<SongList tracks={this.state.tracks} />
		)
	}

}

export default SongListContainer;