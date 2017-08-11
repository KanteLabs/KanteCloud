import React from 'react';
import {Config, getImageUrl, IMAGE_SIZES} from './config';

const TrackViewer = (props) => {
    console.log(props.trackInfo)
    let data = props.trackInfo;
    return(
        // <h1>Track info </h1>
     <ul className="trackGallery">
         {data.map(({id, user_id, title, artwork_url, permalink_url, stream_url,user})=>{
            return(
                <li key={id}>
                    <div className="trackDetails">
                        <div className="trackImg" style={{backgroundImage: `url(${getImageUrl(artwork_url, IMAGE_SIZES.XLARGE)})`}}>
                            <div className="overlay" title={id} onClick={event =>this.handleTrackCall(event)}>
                                
                            </div>
                        </div>
                        <div className="trackText">
                            <img className="userAvatar" src={user.avatar_url } alt=""/>
                            <a href="#trackProfile" className="songTitle" title={title}>{title}</a>
                            <a href={'http://api.soundcloud.com/users/3207?client_id='+Config.client_id} className="userName">{user.username}</a>
                        </div>
                        <audio controls preload="none">
                            <source src={'https://api.soundcloud.com/tracks/'+id+'/stream?format=json&client_id=0PKz7xjH5uemKDK8GdHQyO0mU9kZ0fJ2'} type="audio/mpeg"/>
                        </audio>
                    </div>
                </li>
            )}
        )}
    </ul>
    )
}

export default TrackViewer;