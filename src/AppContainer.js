import React, { Component } from 'react';
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
      trackInfo: []
    }
  }

  componentWillReceiveProps(newProps){
    console.log(newProps)
    if(newProps.trackInfo !== this.props.trackInfo){
      console.log("Received new props")
      this.setState({trackInfo: newProps.trackInfo})
    }else{
      console.log(false)
    }
  }
  componentDidMount(){
    if(this.props.trackInfo !== undefined){
      console.log(true)
      this.setState({
        trackInfo: this.props.trackInfo
      })
    }else{
      console.log(false)
      console.log(this.props)
      return null
    }
  }
    handleAudioPlay=(audio)=>{
      console.log(`Receiving ${audio} and sending to App.js`)
      this.props.playAudio(audio)
    }

  render() {
    return (
        <div className="App-intro">
          <div id="trackViewer">
              {this.state.trackInfo.length>0 ? <TrackViewer trackInfo={this.state.trackInfo} passAudioCallBack={this.handleAudioPlay}/> : <h1>Loading Tracks</h1>}
          </div>
        </div>
    );
  }
}

export default AppContainer;
