import React, { Component } from 'react';
import SC from 'soundcloud';
import {Config, search, genreName, client_id, client_secret, getImageUrl, IMAGE_SIZES, handleLatestTracksClick, handleTrackPlay, handleLoginClick } from './config';
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
            trackInfo: [],
            audio: ''
        };
        this.handleGenreCall = this.handleGenreCall.bind(this)
    };    

    handleLatestTracksClick(){
        handleLatestTracksClick.call(this)
    };

    //This will search for the genre tag by using the function provided in the config file
    handleGenreCall(event){
        console.log(event.target)
    let name = (event.target.name);
    fetch(`${Config.genreTag}${name}`, { method:"GET" })
    .then(response => response.json())
    .catch(error => console.log(error))
    .then(trackInfo => {   
        this.setState({ trackInfo: trackInfo })   
    })
    .catch(error => console.log(error))
    }

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
                        <li className="genreItem active" name={genreName[0]} onClick={ (event) =>this.handleGenreCall(event)}>Pop</li>
                        <li className="genreItem" name={genreName[1]} onClick={ event =>this.handleGenreCall(event)}>Hip-Hop</li>
                        <li className="genreItem" name={genreName[2]} onClick={ event =>this.handleGenreCall(event)}>Reggae</li>
                        <li className="genreItem" name={genreName[3]} onClick={ event =>this.handleGenreCall(event)}>R&B</li>
                        <li className="genreItem" name={genreName[4]} onClick={ event =>this.handleGenreCall(event)}>EDM</li>
                        <li className="genreItem" name={genreName[5]} onClick={ event =>this.handleGenreCall(event)}>Dubstep</li>
                        <li className="navItem" type="button" onClick={() => this.handleLatestTracksClick()}>Latest</li>
                        <li className="loginItem" onClick={() =>this.handleLoginClick()}>Login</li>            
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