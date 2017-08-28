import React, { Component } from 'react';
import AppContainer from './AppContainer';
import UserProfile from './components/UserProfile';
import SongProfile from './components/SongProfile';
import TrackPlayer from './components/TrackPlayer';
import NoMatch from './components/NoMatch';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './search.css';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      audioPlaying: false,
      currAudio: null
    }
    this.playAudio = this.playAudio.bind(this)
  }

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
        <Switch>
          <Route exact path="/" render={() => <AppContainer playAudio={this.playAudio} playStatus={this.state.audioPlaying}/>} />
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
