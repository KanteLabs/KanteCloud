import React, { Component } from 'react';
import TrendingTracks from './TrendingTracks';
import SearchBar from './SearchBar';
import Login from './login';

class NavContainer extends Component {
	render(){
		return(
		<div>
			<Login />
			<TrendingTracks />
			<SearchBar />
		</div>
		)
	}
}

export default NavContainer;