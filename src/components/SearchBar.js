import React, { Component } from 'react';
import {search, genreName, client_id, getImageUrl, IMAGE_SIZES, handleGenreClick, handleLatestTracksClick } from './config';
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

    //This autoload tracks so that the page is not blank
    componentDidMount(){
        fetch(search + "Chance the Rapper", { method:"GET" })
        .then(response => response.json())
        .catch(error => console.log(error))
        .then(trackInfo => {   
            //json.map(entity => tracks.push(entity.title))
            this.setState({ trackInfo: trackInfo })   
        })
        .catch(error => console.log(error))
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

    handleLatestTracksClick(){
        handleLatestTracksClick.call(this)
    };

    //This will search for the genre tag by using the function provided in the config file
    handleGenreCall(event){
        handleGenreClick.call(this, event);
    };

    render(){
        // Desctructuring the state
        const {trackInfo } = this.state;

        return(
            <div className="searchApp">
                <div className="navbar">                    
                <div className="genreList">
                    <button name={genreName[0]} onClick={ event =>this.handleGenreCall(event)}>Pop</button>
                    <button name={genreName[1]} onClick={ event =>this.handleGenreCall(event)}>Hip-Hop</button>
                    <button name={genreName[2]} onClick={ event =>this.handleGenreCall(event)}>Reggae</button>
                    <button name={genreName[3]} onClick={ event =>this.handleGenreCall(event)}>R&B</button>
                    <button name={genreName[4]} onClick={ event =>this.handleGenreCall(event)}>EDM</button>
                    <button name={genreName[5]} onClick={ event =>this.handleGenreCall(event)}>Dubstep</button>
                </div>
                    <input type="text" value={this.state.value} placeholder="Enter a Artist, Song, or Album.." onChange={event => this.handleChange(event)} onKeyPress={this.handleOnKeyPress} />
                    <button type="button" onClick={() => this.handleSearchSubmit()}>Search</button>
                    <button type="button" onClick={() => this.handleLatestTracksClick()}>Latest</button>
                </div>
                <div id="trackViewer">
                     <ul className="trackGallery">{trackInfo.map(this.renderTrack)}</ul>
                </div>
            </div>
        )
    }
    //This configures what should be loaded from a search query
    renderTrack({id, user_id, title, artwork_url, permalink_url, stream_url, user}){
        return( 
            <li key={id}>
                <div className="trackDetails">
                    <div className="trackImg" style={{backgroundImage: `url(${getImageUrl(artwork_url, IMAGE_SIZES.XLARGE)})`}}>
                        <div className="overlay">
                            <p className="playIcon" href="#stream_url">&#9654;</p>
                        </div>
                    </div>
                    <div className="trackText">
                        <img className="userAvatar" src={user.avatar_url } alt=""/>
                        <a href="#trackProfile" className="songTitle">{title}</a>
                        <a href={'http://api.soundcloud.com/users/3207?client_id='+ client_id} className="userName">{user.username}</a>
                    </div>
                </div>
            </li>
        )
    }
};

export default Search;
//&#9654;