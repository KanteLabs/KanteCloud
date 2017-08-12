import React, { Component } from 'react';
import SC from 'soundcloud';
import {Config, genreName, client_id, handleLoginClick } from './config';
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
            trackInfo: []
        };
        this.handleGenreCall = this.handleGenreCall.bind(this)
    };    

    handleLatestTracksClick(){
        fetch(Config.newTracks, { method:"GET" })
        .then(response => response.json())
        .catch(error => console.log(error))
        .then(trackInfo => {
            this.setState({ trackInfo: trackInfo })
            this.props.appCallBack(trackInfo)
        })
        .catch(error => console.log(error))
    }

    //This will search for the genre tag by using the genreTags provided in the config file
    handleGenreCall(event){
        let name = (event.target.name);
        let menuItem = document.querySelector(`a[name="${name}"]`);
        if(menuItem.className === 'nav-item nav-link'){
            document.querySelectorAll('a.nav-item.nav-link').forEach((item)=>{
                item.className = 'nav-item nav-link';
            }) 
            menuItem.className += ' active'
        }
        fetch(`${Config.genreTag}${name}`, { method:"GET" })
        .then(response => response.json())
        .then(trackInfo => {   
            this.setState({ trackInfo: trackInfo })   
            this.props.appCallBack(trackInfo)
        })
        .catch(error => console.log(error))
    }

    handleLoginClick() {
        handleLoginClick.call(this)
    }

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">KanteCloud</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
                <a className="nav-item nav-link" href="#" name={genreName[0]} onClick={(event) =>this.handleGenreCall(event)}>{genreName[0]}</a>
                <a className="nav-item nav-link" href="#" name={genreName[1]} onClick={(event) =>this.handleGenreCall(event)}>{genreName[1]}</a>
                <a className="nav-item nav-link" href="#" name={genreName[2]} onClick={(event) =>this.handleGenreCall(event)}>{genreName[2]}</a>
                <a className="nav-item nav-link" href="#" name={genreName[3]} onClick={(event) =>this.handleGenreCall(event)}>{genreName[3]}</a>
                <a className="nav-item nav-link" href="#" name={genreName[4]} onClick={(event) =>this.handleGenreCall(event)}>{genreName[4]}</a>
                <a className="nav-item nav-link" href="#" name={genreName[5]} onClick={(event) =>this.handleGenreCall(event)}>{genreName[5]}</a>
                <a className="nav-item nav-link navItem" href="#" onClick={() =>this.handleLatestTracksClick()}>Latest</a>
                <a className="nav-item nav-link loginItem" href="#" onClick={() =>this.handleLoginClick()}>Login</a>
                </div>
            </div>
            </nav>
        )
    }
};

export default Search;

/*
<p className="playIcon">&#9654;</p>
*/