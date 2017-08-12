import React, {Component, ReactDOM} from 'react';
import SC from 'soundcloud';
import {Config, getImageUrl, IMAGE_SIZES, client_id, client_secret} from './config';
SC.initialize({client_id: client_id});

class TrackPlayer extends Component{
    constructor(props){
        super(props);
        this.state= {

        }
    }
    componentWillUpdate(){
        console.log('update')
        this.forceUpdate
        console.log('update done')
    }
    render(){
    return(
     <audio controls preload="none">
        <source src={this.props.data} type="audio/mpeg"/>
    </audio>
    )}
}

export default TrackPlayer;