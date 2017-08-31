import React, {Component} from 'react';
import ProfileRender from './ProfileRender';
import {client_id} from './config';

class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: undefined
        }
    }

    componentDidMount(){
        console.log(`Fetching Profile of User ${this.props.match.params.username}`)
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
        <div className="userProfile">
            {this.state.userData !== undefined ? <ProfileRender data={this.state.userData}/> : <h1> Fetching Profile of {this.props.match.params.username} </h1>}
        </div>
        )
    }
}

export default UserProfile;