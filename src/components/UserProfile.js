import React from 'react';

const UserProfile = (props) => {
    return(
        <h1>{props.match.params.userId}</h1>
    )
}

export default UserProfile;

// {`http://api.soundcloud.com/users/${user_id}?client_id=${client_id}`} 