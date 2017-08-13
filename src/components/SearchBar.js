import React, { Component } from 'react';
import SC from 'soundcloud';
import {Config, genreName, client_id } from './config';
import '../search.css';

class Search extends Component{

    constructor(props){
        super(props);
        //trackInfo will hold the names of the songs, and metadata as well
        this.state = {
            trackInfo: [],
            user: null
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
        SC.initialize({
            client_id: Config.client_id,
            redirect_uri: 'https://kantelabs.github.io/KanteCloud/callback.html',
            oauth_token: ""
        });

        // initiate auth popup
        SC.connect().then(function() {
            return SC.get('/me');
        }).then((me)=>{
            console.log('Hello, ' + me.username, me.id);
            document.querySelector('.loginItem').innerText = me.username;
            SC.get('/me/favorites')
        }).then((me)=>{
            console.log(me)
            fetch(`https://api.soundcloud.com/users/${me.id}/favorites/?&client_id=${client_id}`, { method:"GET" })
            .then(response => response.json())
            .then(trackInfo => {   
                this.setState({ trackInfo: trackInfo})
                this.props.appCallBack(trackInfo)
            })
            .catch(error => console.log(error))
        })
    }

    render(){
        return(
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">KanteCloud</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav"><hr/>
                <a className="nav-item nav-link" href="#" name={genreName[0]} onClick={(event) =>this.handleGenreCall(event)}>{genreName[0]}</a><hr/>
                <a className="nav-item nav-link" href="#" name={genreName[1]} onClick={(event) =>this.handleGenreCall(event)}>{genreName[1]}</a><hr/>
                <a className="nav-item nav-link" href="#" name={genreName[2]} onClick={(event) =>this.handleGenreCall(event)}>{genreName[2]}</a><hr/>
                <a className="nav-item nav-link" href="#" name={genreName[3]} onClick={(event) =>this.handleGenreCall(event)}>{genreName[3]}</a><hr/>
                <a className="nav-item nav-link" href="#" name={genreName[4]} onClick={(event) =>this.handleGenreCall(event)}>{genreName[4]}</a><hr/>
                <a className="nav-item nav-link" href="#" name={genreName[5]} onClick={(event) =>this.handleGenreCall(event)}>{genreName[5]}</a><hr/>
                <a className="nav-item nav-link navItem" href="#" onClick={() =>this.handleLatestTracksClick()}>Latest</a><hr/>
                <a className="nav-item nav-link loginItem" href="#" onClick={() =>this.handleLoginClick()}>Login</a>
                </div>
            </div>
            </nav>
        )
    }
};

export default Search;