import React, { Component } from 'react';
import {client_id, search, newTracks} from './config';
import Genres from './Genres'
import 'isomorphic-fetch';
import 'whatwg-fetch';
import SC from 'soundcloud';

class Search extends Component{

    constructor(props){
        super(props);
        
        //trackTitle will hold the names of the songs, and metadata as well
        this.state = {
        	value: '',
            trackTitle: []
        };

        //Handles pressing the enter key
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    };

    handleChange(event){
        event.preventDefault();
        this.setState({ value: event.target.value });
    }

    //This Function handles when a user presses the 'Enter' key
    //If this.state.value has a value then the function will call handleSearchSubmit, else it will do nothing
    handleOnKeyPress = (event) => {
    	if(event.charCode === 13){    		
    		this.state.value !== "" ? event.preventDefault(this.handleSearchSubmit()) : event.preventDefault();
    		event.preventDefault();  
    	}
    }

    handleSearchSubmit(){
        event.preventDefault();

        // Create local scope buffer for trackTitles to store in state in the end
        let trackTitleBuffer = []

        // Shortened expression; instead of client_id: client_id
        SC.initialize({ client_id });

        // Using arrow functions for readability
        if(this.state.value !== ""){        	
    		fetch(search + this.state.value, { method:"GET" })
        	.then(response => response.json())
        	.catch(error => console.log(error))
        	.then(json => {
		        //I had assistance on coding this part. Basically instead rendering each track one by one, the function waits for 
		        //all the tracks to be loaded and then it triggers a render in the trackViewer
            	json.map(entity => trackTitleBuffer.push(entity.title))
            	this.setState({ trackTitle: trackTitleBuffer })
        	})
        	.catch(error => console.log(error))
        }event.preventDefault();
    };

    //This function is similar to the handleSearchSubmit function with some minor changes
   	handleNewClick(){
        event.preventDefault();

        let trackTitleBuffer = []

        SC.initialize({ client_id });

		fetch(newTracks, { method:"GET" })
    	.then(response => response.json())
    	.catch(error => console.log(error))
    	.then(json => {
        	json.map(entity => trackTitleBuffer.push(entity.title))
        	this.setState({ trackTitle: trackTitleBuffer })
    	}).catch(error => console.log(error))
    };

    render(){
        // Desctructuring the state
        const { trackTitle, value } = this.state

        return(
            <form>
            <input type="text" value={this.state.value} placeholder="Enter a Artist, Song, or Album.." onChange={event => this.handleChange(event)} onKeyPress={this.handleOnKeyPress} />
            <button type="button" onClick={() => this.handleSearchSubmit()}>Search</button>
            <button type="button" onClick={() => this.handleNewClick()}>Latest</button>
            <div id="trackViewer">
                 <p>Result for: {value}</p>
                 <ul>{ trackTitle.map(title => <li key={title}>{title}</li>) }</ul>
            </div>
            </form>
        )
    };
};

export default Search;