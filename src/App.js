import React, { Component } from 'react';
import logo from './logo.svg';
import NavContainer from './containers/NavContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>KanteCloud</h2>
        </div>
        <div className="App-intro">
        <NavContainer />
        </div>
      </div>
    );
  }
}

export default App;
