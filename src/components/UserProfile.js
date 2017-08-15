import React, {Component} from 'react';

class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: undefined
        }
    }
    componentDidMount(){
        console.log(this.props)
        // console.log(`Fetching Profile of User ${this.props.match}`)
    }
    render(){
    return(
        <h1>{JSON.stringify(this.props.match.params.userid)}</h1>
        )
    }
}

export default UserProfile;

// {`http://api.soundcloud.com/users/${user_id}?client_id=${client_id}`} 