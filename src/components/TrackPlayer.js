import React, {Component, ReactDOM} from 'react';
import ReactAudioPlayer from 'react-audio-player';
import SC from 'soundcloud';

import {Config, getImageUrl, IMAGE_SIZES, client_id, client_secret} from './config';
SC.initialize({client_id: client_id});

class TrackPlayer extends Component{
    constructor(props){
        super(props);
        this.state= {
            autoPlay: false
        }
    }

    componentDidUpdate(){
        if(!this.state.autoPlay){
            this.setState({autoPlay: true})
        }else{
            null
        }
    }
    render(){
    return(
        <ReactAudioPlayer 
            src={this.props.data}
            autoPlay={this.state.autoPlay}
            controls
        />
    )}
}

export default TrackPlayer;