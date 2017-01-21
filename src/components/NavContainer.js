import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Login from './login';
import Genres from './Genres';

class NavContainer extends Component {
	render(){
		return(
		<div>
			<Login />
			<Genres />
			<SearchBar />
		</div>
		)
	}
}

export default NavContainer;