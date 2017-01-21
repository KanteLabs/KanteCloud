import React, { Component } from 'react';
import NewTracks from './NewTracks';
import SearchBar from './SearchBar';
import Login from './login';
import Genres from './Genres';

class NavContainer extends Component {
	render(){
		return(
		<div>
			<Login />
			<NewTracks />
			<Genres />
			<SearchBar />
		</div>
		)
	}
}

export default NavContainer;