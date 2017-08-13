import { client_id } from './config';
import SC from 'soundcloud';

export const handleOnLoginClick = () => {
	SC.initialize({
  	client_id: client_id,
  	redirect_uri: 'https://kantelabs.github.io/KanteCloud/callback.html',
  	oauth_token: ""
	});

	// initiate auth popup
	SC.connect().then(function() {
  		return SC.get('/me');
	}).then(function(me) {
  		prompt('Hello, ' + me.username);
	});
}
