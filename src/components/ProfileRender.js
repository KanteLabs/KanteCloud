import React, {Component} from 'react';
import {Config, getImageUrl, IMAGE_SIZES, client_id} from './config';
import {Link} from 'react-router-dom';
class ProfileRender extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: {},
            userTracks: false
        }
    }

    componentDidMount(){
        console.log(`Profile of ${this.props.data.username}`)
        let userUrls = [
            `https://api.soundcloud.com/users/${this.props.data.id}/tracks?client_id=${client_id}`,
            `https://api.soundcloud.com/users/${this.props.data.id}/playlists?client_id=${client_id}`,
            `https://api.soundcloud.com/users/${this.props.data.id}/followings?client_id=${client_id}`,
            `https://api.soundcloud.com/users/${this.props.data.id}/followers?client_id=${client_id}`,
            `https://api.soundcloud.com/users/${this.props.data.id}/favorites?client_id=${client_id}`,
            `https://api.soundcloud.com/users/${this.props.data.id}/web-profiles?client_id=${client_id}`,
        
        ]
        let urlsState = [
            {
                state: {}
            }
        ]
        Promise.all(userUrls.map(url =>
            fetch(url).then(resp => resp.json())
        )).then(res => {
            console.log(res)
        })

        // fetch(`${userUrls}`,{method: 'GET'})
        // .then(res=>res.json())
        // .then((res)=>{
        //     console.log(res)
        //     this.setState({
        //         userTracks: res
        //     })
        // }).catch(err=>console.log(err))
        // this.setState({
        //     userData: this.props.data
        // })
    }

    render(){
    let profile = this.state.userData
    let styles = {
        profileImage: {
            width: '150px',height: '150px',
            background: `url(${getImageUrl(profile.avatar_url, IMAGE_SIZES.XLARGE)}) no-repeat center center`,
            borderRadius: '100%',
        }
    }
    return(
        <div className="container">
            <div className="userProfile">
                <div className="profileHead">
                    <h1 className="username">
                        <Link to={`/${profile.permalink}/${profile.id}`}>{profile.username}</Link> 
                        <span className="onlineStatus">{profile.online ? '🔵' : '🔴'}</span> 
                    </h1>
                    {profile.full_name !== "" ? <h6>{profile.full_name}</h6> : null}
                    {profile.city !== "" && profile.country !== "" ? <h6>{profile.city } - {profile.country}</h6> : null}
                    <div className="profileImage" style={styles.profileImage}></div>
                </div>
                <div className="follows">
                    <ul>
                        <li><span>Follow or Following</span></li>
                        <li>Following: <span>{profile.followings_count}</span></li>
                        <li>Followers: <span>{profile.followers_count}</span></li>
                    </ul>
                </div>
                <div className="activity">
                    <ul>
                        <li>Tracks: <span>{profile.track_count}</span></li>
                        <li>Playlists: <span>{profile.playlist_count}</span> </li>
                        <li>Favorites: <span>{profile.public_favorites_count}</span> </li>
                        <li>Reposts: <span>{profile.reposts_count}</span> </li>
                    </ul>
                </div>
                <div className="profileBody">
                    {profile.description ? <h4>{profile.description}</h4> : null}
                </div>
                <div className="profileEnd">
                    <ul>
                        {profile.myspace_name ? <li><p>{profile.myspace_name}</p></li> : null}
                        {profile.website ? <li><a href={profile.website}>{profile.website}</a></li> : null}
                    </ul>
                </div>
            </div>
            {this.renderUserTracks}
        </div>
        )
    }
}

export default ProfileRender;
/* 

{
"id":51562330, -> include for routing usage
"kind":"user",
"permalink":"kehlanimusic", -> include for routing usage
"username":"Kehlani",  -> include
"last_modified":"2017/08/12 22:15:32 +0000",
"uri":"https://api.soundcloud.com/users/51562330",
"permalink_url":"http://soundcloud.com/kehlanimusic",
"avatar_url":"https://i1.sndcdn.com/avatars-000271481823-fszt02-large.jpg", -> include as profile image
"country":"United States",  -> include
---- include if not empty
"first_name":"",
"last_name":"",
"full_name":"",
----
"description":"Singer/Songwriter \nOakland to Los Angeles
\n\nMGMT:\ndavid@abvgrnd.com\ninfo@thetsunamimob.com
\n\nBOOKING:\nCaroline Yim @ ICM \nCyim@icmpartners.com", -> include
"city":"Oakland, CA", -> include
"discogs_name":null, 
---- include if not false or null
"myspace_name":null,
"website":null,
"website_title":null,
----
"track_count":95, -> link to users tracks
"playlist_count":5, -> link to users profile
"online":false, -> use green for true and red for false, could be an icon
"plan":"Pro Plus", -> include
"public_favorites_count":7,
"followers_count":508907, -> include
"followings_count":0, -> include
"subscriptions":[
{
"product":{
"id":"creator-pro-unlimited",
"name":"Pro Unlimited"
}
}
],
"reposts_count":16  -> include
}


Methods	            Path	                    Description
GET	                /users/{id}	a user
GET	                /users/{id}/tracks	        list of tracks of the user
GET	                /users/{id}/playlists	    list of playlists (sets) of the user
GET	                /users/{id}/followings	    list of users who are followed by the user
GET, PUT, DELETE	/users/{id}/followings/{id} a user who is followed by the user
GET	                /users/{id}/followers	    list of users who are following the user
GET	                /users/{id}/followers/{id}	user who is following the user
GET	                /users/{id}/comments	    list of comments from this user
GET	                /users/{id}/favorites	    list of tracks favorited by the user
GET, PUT, DELETE	/users/{id}/favorites/{id}	track favorited by the user
GET, PUT, DELETE	/users/{id}/web-profiles	list of web profiles

let userUrls = [
    `https://api.soundcloud.com/users/${this.props.data.id}/tracks?client_id=${client_id}`,
    `https://api.soundcloud.com/users/${this.props.data.id}/playlists?client_id=${client_id}`,
    `https://api.soundcloud.com/users/${this.props.data.id}/followings?client_id=${client_id}`,
    `https://api.soundcloud.com/users/${this.props.data.id}/followers?client_id=${client_id}`,
    `https://api.soundcloud.com/users/${this.props.data.id}/comments?client_id=${client_id}`,
    `https://api.soundcloud.com/users/${this.props.data.id}/favorites?client_id=${client_id}`,
    `https://api.soundcloud.com/users/${this.props.data.id}/web-profiles?client_id=${client_id}`,
]
*/