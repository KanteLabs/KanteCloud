import React, { Component } from 'react';
import SC from 'soundcloud';
import {Config, genreName, client_id } from './config';
import '../search.css';

class NavBar extends Component{

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
        let name = (event.target.title);
        let menuItem = document.querySelector(`button[title="${name}"]`);
        if(menuItem.className === 'nav-item nav-link'){
            document.querySelectorAll('button.nav-item.nav-link').forEach((item)=>{
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

    loginSuccess(me){
        console.log('Login Success')
        console.log(me.id, me.username)
    }

    handleLoginClick() {
        SC.initialize({
            client_id: Config.client_id,
            redirect_uri: 'https://kantelabs.github.io/KanteCloud/callback.html',
            oauth_token: ""
        });

        SC.connect().then(function() {
            return SC.get('/me');
        }).then((me)=>{
            console.log('Hello, ' + me.username, me.id);
            this.loginSuccess.bind(me)
            document.querySelector('.loginItem').innerText = me.username;
            SC.get('/me/favorites')
            fetch(`https://api.soundcloud.com/users/${me.id}/favorites/?&client_id=${client_id}&limit=100`, { method:"GET" })
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
                <div className="navbar-nav">
                <button className="nav-item nav-link" title={genreName[0]} onClick={(event) =>this.handleGenreCall(event)}>{genreName[0]}</button>
                <button className="nav-item nav-link" title={genreName[1]} onClick={(event) =>this.handleGenreCall(event)}>{genreName[1]}</button>
                <button className="nav-item nav-link" title={genreName[2]} onClick={(event) =>this.handleGenreCall(event)}>{genreName[2]}</button>
                <button className="nav-item nav-link" title={genreName[3]} onClick={(event) =>this.handleGenreCall(event)}>{genreName[3]}</button>
                <button className="nav-item nav-link" title={genreName[4]} onClick={(event) =>this.handleGenreCall(event)}>{genreName[4]}</button>
                <button className="nav-item nav-link" title={genreName[5]} onClick={(event) =>this.handleGenreCall(event)}>{genreName[5]}</button>
                <button className="nav-item nav-link navItem" onClick={() =>this.handleLatestTracksClick()}>Latest</button>
                <button className="nav-item nav-link loginItem" onClick={() =>this.handleLoginClick()}>Login</button>
                </div>
            </div>
            </nav>
        )
    }
};

export default NavBar;