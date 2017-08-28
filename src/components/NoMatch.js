import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class NoMatch extends Component {
    componentDidMount(){
        console.log('404')
    }

    render(){
    return(
        <div>
            <h1>404 Page Not found :( </h1>
            <Redirect to='' />
        </div>
        )
    }
}

export default NoMatch;