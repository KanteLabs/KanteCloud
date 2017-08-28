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
      audio: null
    }
    this.playAudio = this.playAudio.bind(this)
  }

  playAudio=(track)=>{
    console.log(`new ${track}`)
    let audio = document.querySelector('audio.react-audio-player');
    audio.paused ? audio.play() : audio.pause();
    this.setState({
      audio: track
    })
    // finalAudioCallBack={this.playAudio}
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
        <TrackPlayer data={this.state.audio}/>
      </div>
    </Router>
    );
  }
}

export default App;
