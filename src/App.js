import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import TrackViewer from './components/TrackViewer';
import SC from 'soundcloud';
import {Config, genreName, client_id, client_secret, getImageUrl, IMAGE_SIZES, handleGenreClick, handleLatestTracksClick, handleTrackPlay, handleLoginClick } from './components/config';
import './search.css';
import 'isomorphic-fetch';
import 'whatwg-fetch';

SC.initialize({client_id: client_id});

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    //trackInfo will hold the names of the songs, and metadata as well
    this.state ={
      value: '',
      audio: '',
      trackInfo: []
    }

    // this.handleOnKeyPress = this.handleOnKeyPress.bind(this); //Handles pressing the enter key

  }
  componentDidMount(){
    fetch(Config.search + "Chance the Rapper", { method:"GET" })
    .then(response => response.json())
    .catch(error => console.log(error))
    .then(trackInfo => {
      this.setState({
        trackInfo: trackInfo 
      })   
    }).catch(error => console.log(error))
  };


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>KanteCloud</h2>
        </div>
        <div className="App-intro">
          <SearchBar />
          <div id="trackViewer">
              {this.state.trackInfo.length>0 ? <TrackViewer trackInfo={this.state.trackInfo}/> : <h1>Search for a song</h1>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
