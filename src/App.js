import React, { Component } from 'react';
import AppContainer from './AppContainer';
import UserProfile from './components/UserProfile';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './search.css';
import './App.css';

let Users = (props) => {
  return(
    <h1>Hi</h1>
  )
}

class App extends Component {
  render() {
    return (
    <Router>
      <div className="App">
        <Route exact path='/' component={AppContainer}/>
        <Route exact path='/users' component={Users}/>
        <Route exact path='/users/:userid' component={UserProfile}/>
      </div>
    </Router>
    );
  }
}

export default App;
