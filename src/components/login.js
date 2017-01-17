import React, { Component } from 'react';
import { client_id } from './config';
import SC from 'soundcloud';

function handleLoginClick() {
	SC.initialize({
  	client_id: client_id,
  	redirect_uri: 'https://kantelabs.github.io/KanteCloud/callback.html'
	});

	// initiate auth popup
	SC.connect().then(function() {
  		return SC.get('/me');
	}).then(function(me) {
  	prompt('Hello, ' + me.username);
	});

	SC.connect().then(function(){
  	return SC.put('/me/followings/183');
	}).then(function(user){
  	alert('You are now following ' + user.username);
	}).catch(function(error){
	  alert('Error: ' + error.message);
	});
}

class Login extends Component {

	render(){		
		return (

			<button onClick={handleLoginClick}>Login</button>
		);
	}

}

export default Login;
