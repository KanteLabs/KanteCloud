import React, { Component } from 'react';
import AppContainer from './AppContainer';
import UserProfile from './components/UserProfile';
import SongProfile from './components/SongProfile';
import NoMatch from './components/NoMatch';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './search.css';
import './App.css';

class App extends Component {
  render() {
    return (
    <Router>
      <div className="App">
      <Switch>
        <Route exact path='/' component={AppContainer}/>
        <Route exact path='/:username/:userid' component={UserProfile}/>
        <Route exact path='/:username/:userid/:songid' component={SongProfile}/> 
        <Route component={NoMatch} />
      </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
