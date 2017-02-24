import React, { Component } from 'react';
import SC from 'soundcloud';
import {search, genreName, client_id, client_secret, getImageUrl, IMAGE_SIZES, handleGenreClick, handleLatestTracksClick, handleTrackPlay, handleLoginClick } from './config';
import '../search.css';
import 'isomorphic-fetch';
import 'whatwg-fetch';

SC.initialize({client_id: client_id});

//Prevents more than one track for being played at a time.
document.addEventListener('play', function(e){
    var audios = document.getElementsByTagName('audio');
    for(var i = 0, len = audios.length; i < len;i++){
        if(audios[i] !== e.target){
            audios[i].pause();
        }
    }
}, true);


class Search extends Component{

    constructor(props){
        super(props);
        
        //trackInfo will hold the names of the songs, and metadata as well
        this.state = {
        	value: '',
            trackInfo: [],
            audio: ''
        };

        this.handleOnKeyPress = this.handleOnKeyPress.bind(this); //Handles pressing the enter key
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

    handleLoginClick() {
        handleLoginClick.call(this)
    }

    render(){
        // Desctructuring the state
        const {trackInfo } = this.state;

        function handleTrackCall(event){
        let track = (event.target.title)
        console.log(track)
        SC.initialize({client_id: client_id, client_secret: client_secret});

        var player = SC.stream("tracks/"+track+"/stream", {useHTML5Audio: true},
            function(player){
            player.play();
        });

        }

        return(
            <div className="searchApp">
                <div className="navbar">                    
                    <ul className="genreList">
                        <li className="genreItem active" name={genreName[0]} onClick={ event =>this.handleGenreCall(event)}>Pop</li>
                        <li className="genreItem" name={genreName[1]} onClick={ event =>this.handleGenreCall(event)}>Hip-Hop</li>
                        <li className="genreItem" name={genreName[2]} onClick={ event =>this.handleGenreCall(event)}>Reggae</li>
                        <li className="genreItem" name={genreName[3]} onClick={ event =>this.handleGenreCall(event)}>R&B</li>
                        <li className="genreItem" name={genreName[4]} onClick={ event =>this.handleGenreCall(event)}>EDM</li>
                        <li className="genreItem" name={genreName[5]} onClick={ event =>this.handleGenreCall(event)}>Dubstep</li>
                        <input className="textInput" type="text" value={this.state.value} placeholder="Search" onChange={event => this.handleChange(event)} onKeyPress={this.handleOnKeyPress} />
                        <li className="navItem" type="button" onClick={() => this.handleSearchSubmit()}>Search</li>
                        <li className="navItem" type="button" onClick={() => this.handleLatestTracksClick()}>Latest</li>
                        <li className="loginItem" onClick={() =>this.handleLoginClick()}>Login</li>            
                    </ul>
                </div>
                <div id="trackViewer">
                     <ul className="trackGallery">{trackInfo.map(function({id, user_id, title, artwork_url, permalink_url, stream_url,user}){return(
                        <li key={id}>
                        <div className="trackDetails">
                            <div className="trackImg" style={{backgroundImage: `url(${getImageUrl(artwork_url, IMAGE_SIZES.XLARGE)})`}}>
                                <div className="overlay" title={id} onClick={event =>handleTrackCall(event)}>
                                    
                                </div>
                            </div>
                            <div className="trackText">
                                <img className="userAvatar" src={user.avatar_url } alt=""/>
                                <a href="#trackProfile" className="songTitle" title={title}>{title}</a>
                                <a href={'http://api.soundcloud.com/users/3207?client_id='+ client_id} className="userName">{user.username}</a>
                            </div>
                            <audio controls preload="none">
                                <source src={'https://api.soundcloud.com/tracks/'+id+'/stream?format=json&client_id=0PKz7xjH5uemKDK8GdHQyO0mU9kZ0fJ2'} type="audio/mpeg"/>
                            </audio>
                        </div>
                        </li>
                        )})}
                     </ul>
                </div>
            </div>
        )
    }
};

export default Search;

/*
<p className="playIcon">&#9654;</p>
*/