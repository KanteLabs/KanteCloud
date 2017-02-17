import React, { Component } from 'react';

class SongList extends Component {
	render() {
		return <ul> {this.props.tracks.map(this.renderTrack)} </ul>;
	}

	//Different Key values that I want to render. It will be more efficent to use an Array thats in the config.js file
	renderTrack({id, user_id, title, artwork_url, permalink_url, stream_url, user}){
		return <li key={id}>{title} and {user.username} and {user.avatar_url}</li>
	}
}
export default SongList;