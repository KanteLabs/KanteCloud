import React, {Component} from 'react';

class NoMatch extends Component {
   

    componentDidMount(){
        console.log('404')
    }

    render(){
    return(
        <div>
            <h1>404 Page Not found :( </h1>
        </div>
        )
    }
}

export default NoMatch;