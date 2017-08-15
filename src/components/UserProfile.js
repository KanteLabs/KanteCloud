import React, {Component} from 'react';
import {client_id} from './config';

class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: undefined
        }
    }
    
    componentDidMount(){
        console.log(`Fetching Profile of User ${this.props.match.params.userid}`)
        let user_id = this.props.match.params.userid;
        fetch(`http://api.soundcloud.com/users/${user_id}?client_id=${client_id}`,{method: 'GET'})
        .then( response => response.json())
        .then((profileInfo) => {
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