import React, { Component } from 'react';
import AppContainer from './AppContainer';
import NavBar from './components/NavBar';
import UserProfile from './components/UserProfile';
import SongProfile from './components/SongProfile';
import TrackPlayer from './components/TrackPlayer';
import NoMatch from './components/NoMatch';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Config} from './components/config';
import './search.css';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      audioPlaying: false,
      currAudio: null,
      value: '',
      trackInfo: undefined
    }
    this.playAudio = this.playAudio.bind(this)
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
    // Using arrow functions for readability
    if(this.state.value !== ""){        	
    fetch(Config.search + this.state.value, { method:"GET" })
      .then(response => response.json())
      .catch(error => console.log(error))
      .then(trackInfo => {
            this.setState({trackInfo: trackInfo})
      })
      .catch(error => console.log(error))
    }
  };

  playAudio=(track)=>{
    let audio = document.querySelector('audio.react-audio-player');
    this.setState({
      currAudio: track
    })
    if(audio.paused){
      audio.play();
      this.setState({audioPlaying: true})
    }else{
      audio.pause();
      this.setState({audioPlaying: false})
    }
  }

  render() {
    return (
    <Router>
      <div className="App">
        <NavBar appCallBack={this.searchCallBack}/>
          <div className="textInput">
            <input type="text" value={this.state.value} placeholder="Search" onChange={event => this.handleChange(event)} onKeyPress={this.handleOnKeyPress} />
            <button className="btn btn-primary" type="button" onClick={() => this.handleSearchSubmit()}>Search</button>
          </div>  
        <Switch>
          <Route exact path="/" render={() => <AppContainer trackInfo={this.state.trackInfo} playAudio={this.playAudio} playStatus={this.state.audioPlaying}/>} />
          <Route exact path="/KanteCloud" render={() => <AppContainer trackInfo={this.state.trackInfo} playAudio={this.playAudio} playStatus={this.state.audioPlaying}/>} />
          <Route exact path='/:username/:userid' component={UserProfile}/>
          <Route exact path='/:username/:userid/:songid' component={SongProfile}/> 
          <Route component={NoMatch} />
        </Switch>
        <TrackPlayer data={this.state.currAudio} playState={this.state.audioPlaying}/> 
      </div>
    </Router>
    );
  }
}

export default App;
