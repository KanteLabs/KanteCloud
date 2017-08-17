import React, {Component} from 'react';
import TrackPlayer from './TrackPlayer';
import UserProfile from './UserProfile';
import SC from 'soundcloud';
import {getImageUrl, IMAGE_SIZES, client_id, client_secret} from './config';
import {BrowserRouter as Route, Link} from 'react-router-dom';
SC.initialize({client_id: client_id, client_secret: client_secret});

class TrackViewer extends Component {
    constructor(props){
        super(props);
        this.state = {
            audio: 'https://api.soundcloud.com/tracks/266129708/stream?secret_token%5BuseHTML5Audio%5D=true&format=json&client_id=0PKz7xjH5uemKDK8GdHQyO0mU9kZ0fJ2'
        }
    }

    playCallBack(event){
        let track = (event.target.title)
        // let audio = document.querySelector('audio.react-audio-player');
        let divItem = document.querySelector(`div.overlay[title='${track}']`)
        console.log(track, divItem)
        // audio.paused ? audio.play() : audio.pause();
        divItem.innerHTML === ' ▶ ' ? divItem.innerHTML = ' || ' : divItem.innerHTML = ' ▶ ';
        this.setState({
            audio: `https://api.soundcloud.com/tracks/${track}/stream?secret_token%5BuseHTML5Audio%5D=true&format=json&client_id=${client_id}`
        })
        this.props.passAudioCallBack(this.state.audio)

    }

    render(){
    let data = this.props.trackInfo;
    let playIcon = ' ▶ ';
    return(
     <ul className="trackGallery">
         <Route exact path='/users/:userId' component={UserProfile} />
          {/* <TrackPlayer data={this.state.audio}/>  */}
         {data.map(({id, user_id, title, artwork_url, permalink_url, stream_url,user})=>{
            return(
                <li key={id}>
                    <div className="trackDetails">
                        <div className="trackImg" style={{backgroundImage: `url(${getImageUrl(artwork_url, IMAGE_SIZES.XLARGE)})`}}>
                            <div className="overlay" title={id} onClick={(event)=>this.playCallBack(event)}>
                                {playIcon}
                            </div>
                        </div>
                        <div className="trackText">
                            <img className="userAvatar" src={user.avatar_url } alt=""/>
                            <Link to={`/${user.permalink}/${user_id}/${id}`} className="songTitle">{title}</Link>
                            <Link to={`/${user.permalink}/${user_id}`} className="userName">{user.username}</Link>
                            {/* <a href="#"> ♡ or ❤️</a> */}
                            
                        </div>
                        {/* <audio controls preload="none">
                            <source src={'https://api.soundcloud.com/tracks/'+id+'/stream?format=json&client_id=0PKz7xjH5uemKDK8GdHQyO0mU9kZ0fJ2'} type="audio/mpeg"/>
                        </audio> */}
                    </div>
                </li>
            )}
        )}
    </ul>
    )}
}

export default TrackViewer;