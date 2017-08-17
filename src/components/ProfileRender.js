import React, {Component} from 'react';

class ProfileRender extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: {}
        }
    }

    componentDidMount(){
        console.log(`Profile of ${this.props.data.username}`)
    }

    render(){
    return(
        <div className="userProfile">
            
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


*/