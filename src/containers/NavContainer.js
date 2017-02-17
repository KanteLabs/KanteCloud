import React, { Component } from 'react';
import SearchBar from '../components/SearchBar';
import Login from '../components/login';

class NavContainer extends Component {
	render(){
		return(
		<div>
			<Login />
			<SearchBar />
		</div>
		)
	}
}

export default NavContainer;