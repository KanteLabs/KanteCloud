import React, {Component} from 'react';
import {getImageUrl, IMAGE_SIZES, client_id} from './config';
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
        this.setState({
            userData: this.props.data,
            userTracks: this.props.userTracks
        })  
    }

    render(){
    let profile = this.state.userData
    let styles = {
        profileImage: {
            width: '150px',height: '150px',
            borderRadius: '100%',
        },
        cardBodyOverlay: {
            backgroundImage: `url("https://i1.sndcdn.com/avatars-000035176561-rg0orz-t500x500.jpg")`,
        }
    }
    return(
        <div className="card">
            {/* <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a> */}
            <div className="card-body">
                <div className="cardBodyImage" style={styles.cardBodyOverlay}></div>
                <img className="card-img-top" src={getImageUrl(profile.avatar_url, IMAGE_SIZES.XLARGE)} style={styles.profileImage} alt={profile.username}/>
                <h1 className="card-title">
                    <Link to={`/${profile.permalink}/${profile.id}`}>{profile.username}</Link> 
                    <span className="onlineStatus">{profile.online ? '🔵' : '🔴'}</span> 
                </h1>
                {profile.full_name !== "" ? <h6 className="card-subtitle mb-2 text-muted">{profile.full_name}</h6> : null}
                {profile.city !== "" && profile.country !== "" ? <h6 className="card-subtitle mb-2 text-muted">{profile.city } - {profile.country}</h6> : null}
                <div className="card-text">
                    {profile.description ? <p>{profile.description}</p> : null}
                </div> 
            </div>
             <ul className="list-group list-group-flush">
                <li className="list-group-item">Followers: <span>{profile.followers_count}</span> and Following: <span>{profile.followings_count}</span></li>
                <li className="list-group-item">Tracks: <span>{profile.track_count}</span></li>
                <li className="list-group-item">Playlists: <span>{profile.playlist_count}</span> </li>
                <li className="list-group-item">Favorites: <span>{profile.public_favorites_count}</span> </li>
                <li className="list-group-item">Reposts: <span>{profile.reposts_count}</span> </li>
                {profile.website ? <li className="list-group-item"><a href={profile.website}>{profile.website}</a></li> : null}
            </ul>
            {/* {this.renderUserTracks} */}
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
            `https://api.soundcloud.com/users/${this.props.data.id}/favorites?client_id=${client_id}`,
            `https://api.soundcloud.com/users/${this.props.data.id}/web-profiles?client_id=${client_id}`,
        
        ]
        let urlsState = [
            {
                user_tracks: {},
                playlist: {},
                followings: {},
                followers: {},
                favorites: {},
                social_media: {},
            }
        ]
        Promise.all(userUrls.map(url =>
            fetch(url).then(resp => resp.json())
        )).then(res => {
            console.log(res)
            for(let i of urlsState){
                urlsState[i] = res;
            }
            console.log(urlsState)
        })
*/

