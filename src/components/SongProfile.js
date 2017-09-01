import React, {Component} from 'react';
import {Config, client_id} from './config';

class SongProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            songData: {}
        }
    }
    
    componentDidMount(){
        console.log(this.props)
        console.log('songprofile')
        console.log(`Fetching Song id: ${this.props.match.params.songid}`)
        let songid = this.props.match.params.songid;
        fetch(`${Config.singleTrack}/${songid}?client_id=${client_id}`,{method: 'GET'})
        .then( response => response.json())
        .then(songInfo => {
            console.log(songInfo)
            this.setState({
                songData: songInfo
            })
        })
        .catch(err=>console.log(err))
    }

    render(){
        return(
            <h1>{this.props.match.params.songid}</h1>
        )
    }
}

export default SongProfile;
// {
// "kind":"track",
// "id":266129708,
// "created_at":"2016/05/27 02:46:52 +0000",
// "user_id":6969243,
// "duration":304693,
// "commentable":true,
// "state":"finished",
// "original_content_size":53733882,
// "last_modified":"2017/08/15 15:43:04 +0000",
// "sharing":"public",
// "tag_list":"",
// "permalink":"no-problem-feat-lil-wayne-2-chainz",
// "streamable":true,
// "embeddable_by":"all",
// "purchase_url":null,
// "purchase_title":null,
// "label_id":null,
// "genre":"Hip-hop & Rap",
// "title":"No Problem (feat. Lil Wayne & 2 Chainz)",
// "description":"ChanceRaps.com",
// "label_name":null,
// "release":null,
// "track_type":null,
// "key_signature":null,
// "isrc":"TCACO1667423",
// "video_url":null,
// "bpm":null,
// "release_year":null,
// "release_month":null,
// "release_day":null,
// "original_format":"wav",
// "license":"all-rights-reserved",
// "uri":"https://api.soundcloud.com/tracks/266129708",
// "user":{
// "id":6969243,
// "kind":"user",
// "permalink":"chancetherapper",
// "username":"\"Chance The Rapper\"",
// "last_modified":"2017/07/15 05:56:02 +0000",
// "uri":"https://api.soundcloud.com/users/6969243",
// "permalink_url":"http://soundcloud.com/chancetherapper",
// "avatar_url":"https://i1.sndcdn.com/avatars-000035176561-rg0orz-large.jpg"
// },
// "permalink_url":"https://soundcloud.com/chancetherapper/no-problem-feat-lil-wayne-2-chainz",
// "artwork_url":"https://i1.sndcdn.com/artworks-000164662532-4ct5ra-large.jpg",
// "stream_url":"https://api.soundcloud.com/tracks/266129708/stream",
// "download_url":"https://api.soundcloud.com/tracks/266129708/download",
// "playback_count":58114124,
// "download_count":0,
// "favoritings_count":843909,
// "reposts_count":55348,
// "comment_count":6435,
// "downloadable":false,
// "waveform_url":"https://w1.sndcdn.com/7b1icp7og0a1_m.png",
// "attachments_uri":"https://api.soundcloud.com/tracks/266129708/attachments"
// }
