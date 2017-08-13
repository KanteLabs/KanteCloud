import React, {Component} from 'react';
import ReactAudioPlayer from 'react-audio-player';

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