import React, { Component } from 'react';
import {search, newTracks, genreTag, genreName } from './config';
import '../search.css';
import 'isomorphic-fetch';
import 'whatwg-fetch';

class Search extends Component{

    constructor(props){
        super(props);
        
        //trackInfo will hold the names of the songs, and metadata as well
        this.state = {
        	value: '',
            trackInfo: []
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

        // Using arrow functions for readability
        if(this.state.value !== ""){        	
    		fetch(search + this.state.value, { method:"GET" })
        	.then(response => response.json())
        	.catch(error => console.log(error))
        	.then(trackInfo => {
                this.setState({trackInfo: trackInfo})
        	})
        	.catch(error => console.log(error))
        }event.preventDefault();
    };

    //This function is similar to the handleSearchSubmit function with some minor changes for showing, only new tracks
   	handleNewClick(){
        event.preventDefault();

        fetch(newTracks, { method:"GET" })
        .then(response => response.json())
        .catch(error => console.log(error))
        .then(trackInfo => {   
            //json.map(entity => tracks.push(entity.title))
            this.setState({ trackInfo: trackInfo })   
        })
    	.catch(error => console.log(error))
    };

    //This autoload trending and new tracks
    componentDidMount(){
        fetch(newTracks, { method:"GET" })
        .then(response => response.json())
        .catch(error => console.log(error))
        .then(trackInfo => {   
            //json.map(entity => tracks.push(entity.title))
            this.setState({ trackInfo: trackInfo })   
        })
        .catch(error => console.log(error))
    };

    handleGenreClick = (event) => {
        let name = (event.target.name);

        event.preventDefault();

        fetch(genreTag + name, { method:"GET" })
        .then(response => response.json())
        .catch(error => console.log(error))
        .then(trackInfo => {   
            //json.map(entity => tracks.push(entity.title))
            this.setState({ trackInfo: trackInfo })   
        })
        .catch(error => console.log(error))
    };
   
    render(){
        // Desctructuring the state
        const { value, trackInfo } = this.state

        return(
            <div className="searchApp">
                <div className="navbar">                    
                <div className="genreList">
                    <button name={genreName[0]} onClick={ event =>this.handleGenreClick(event)}>Pop</button>
                    <button name={genreName[1]} onClick={ event =>this.handleGenreClick(event)}>Hip-Hop</button>
                    <button name={genreName[2]} onClick={ event =>this.handleGenreClick(event)}>Reggae</button>
                    <button name={genreName[3]} onClick={ event =>this.handleGenreClick(event)}>R&B</button>
                    <button name={genreName[4]} onClick={ event =>this.handleGenreClick(event)}>EDM</button>
                    <button name={genreName[5]} onClick={ event =>this.handleGenreClick(event)}>Dubstep</button>
                </div>
                    <input type="text" value={this.state.value} placeholder="Enter a Artist, Song, or Album.." onChange={event => this.handleChange(event)} onKeyPress={this.handleOnKeyPress} />
                    <button type="button" onClick={() => this.handleSearchSubmit()}>Search</button>
                    <button type="button" onClick={() => this.handleNewClick()}>Latest</button>
                </div>
                <div id="trackViewer">
                     <p>Result for: {value}</p>
                     <ul>{trackInfo.map(this.renderTrack)}</ul>
                </div>
            </div>
        )
    }
    //This configures what should be loaded from a search query
    renderTrack({id, user_id, title, artwork_url, permalink_url, stream_url, user}){
        return <li key={id}>{title} and {user.username} and {user.avatar_url}</li>
    }
};

export default Search;