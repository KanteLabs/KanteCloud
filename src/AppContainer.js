import React, { Component } from 'react';
import NavBar from './components/NavBar';
import TrackViewer from './components/TrackViewer';
import SC from 'soundcloud';
import {Config, client_id} from './components/config';
import './search.css';
import './App.css';

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



class AppContainer extends Component {
  constructor(props){
    super(props);
    //trackInfo will hold the names of the songs, and metadata as well
    this.state ={
      value: '',
      currAudio: null,
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

  searchCallBack = (searchResults) => {
    this.setState({
      trackInfo: searchResults
    })
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

    handleAudioPlay=(audio)=>{
      console.log(`Receiving ${audio} and sending to App.js`)
      console.log(this)
      console.log(this.props)
      this.props.finalAudioCallBack(audio)
    }

  render() {
    return (
        <div className="App-intro">
          <NavBar appCallBack={this.searchCallBack}/>
          <div className="textInput">
            <input type="text" value={this.state.value} placeholder="Search" onChange={event => this.handleChange(event)} onKeyPress={this.handleOnKeyPress} />
            <button className="btn btn-primary" type="button" onClick={() => this.handleSearchSubmit()}>Search</button>
          </div>
          <div id="trackViewer">
              {this.state.trackInfo.length>0 ? <TrackViewer trackInfo={this.state.trackInfo} passAudioCallBack={this.handleAudioPlay}/> : <h1>Loading Tracks</h1>}
          </div>
        </div>
    );
  }
}

export default AppContainer;
