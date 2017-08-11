import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import TrackViewer from './components/TrackViewer';
import SC from 'soundcloud';
import {Config, genreName, client_id, client_secret, getImageUrl, IMAGE_SIZES, handleLatestTracksClick, handleTrackPlay, handleLoginClick } from './components/config';
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

    this.handleOnKeyPress = this.handleOnKeyPress.bind(this); //Handles pressing the enter key

  }
  componentDidMount(){
    fetch(`${Config.search}Chance the Rapper`, { method:"GET" })
    .then(response => response.json())
    .catch(error => console.log(error))
    .then(trackInfo => {
      this.setState({
        trackInfo: trackInfo 
      })   
    }).catch(error => console.log(error))
  };

    //This Function handles when a user presses the 'Enter' key
    //If this.state.value has a value then the function will call handleSearchSubmit, else it will do nothing
    handleOnKeyPress = (event) => {
    	if(event.charCode === 13){    		
    		this.state.value !== "" ? event.preventDefault(this.handleSearchSubmit()) : event.preventDefault();
    		event.preventDefault();  
    	}
    }

  handleChange(event){
      event.preventDefault();
      this.setState({ value: event.target.value });
  }

  handleSearchSubmit(){
        event.preventDefault();
        // Using arrow functions for readability
        if(this.state.value !== ""){        	
    		fetch(Config.search + this.state.value, { method:"GET" })
        	.then(response => response.json())
        	.catch(error => console.log(error))
        	.then(trackInfo => {
                this.setState({trackInfo: trackInfo})
        	})
        	.catch(error => console.log(error))
        }event.preventDefault();
    };


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>KanteCloud</h2>
        </div>
        <div className="App-intro">
          <SearchBar />
          <input className="textInput" type="text" value={this.state.value} placeholder="Search" onChange={event => this.handleChange(event)} onKeyPress={this.handleOnKeyPress} />
          <button className="navItem" type="button" onClick={() => this.handleSearchSubmit()}>Search</button>
          <div id="trackViewer">
              {this.state.trackInfo.length>0 ? <TrackViewer trackInfo={this.state.trackInfo}/> : <h1>Search for a song</h1>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
