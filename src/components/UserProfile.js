import React, {Component} from 'react';
import {client_id} from './config';

class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: {}
        }
    }

    componentDidMount(){
        console.log(`Fetching Profile of User ${this.props.match.params.userid}`)
        let user_id = this.props.match.params.userid;
        fetch(`http://api.soundcloud.com/users/${user_id}?client_id=${client_id}`,{method: 'GET'})
        .then( response => response.json())
        .then(profileInfo => {
            console.log(profileInfo)
            this.setState({
                userData: profileInfo
            })
        })
        .catch(err=>console.log(err))
    }

    render(){
    return(
        <h1>{JSON.stringify(this.props.match.params.userid)}</h1>
        )
    }
}

export default UserProfile;

// {`http://api.soundcloud.com/users/${user_id}?client_id=${client_id}`} 
/* 

{
"id":51562330,
"kind":"user",
"permalink":"kehlanimusic",
"username":"Kehlani",
"last_modified":"2017/08/12 22:15:32 +0000",
"uri":"https://api.soundcloud.com/users/51562330",
"permalink_url":"http://soundcloud.com/kehlanimusic",
"avatar_url":"https://i1.sndcdn.com/avatars-000271481823-fszt02-large.jpg",
"country":"United States",
"first_name":"",
"last_name":"",
"full_name":"",
"description":"Singer/Songwriter \nOakland to Los Angeles\n\nMGMT:\ndavid@abvgrnd.com\ninfo@thetsunamimob.com\n\nBOOKING:\nCaroline Yim @ ICM \nCyim@icmpartners.com",
"city":"Oakland, CA",
"discogs_name":null,
"myspace_name":null,
"website":null,
"website_title":null,
"track_count":95,
"playlist_count":5,
"online":false,
"plan":"Pro Plus",
"public_favorites_count":7,
"followers_count":508907,
"followings_count":0,
"subscriptions":[
{
"product":{
"id":"creator-pro-unlimited",
"name":"Pro Unlimited"
}
}
],
"reposts_count":16
}


*/