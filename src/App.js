import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <Router>
          <Route exact path="/" component={() => <p>Hello</p>}/>

      </Router>

    );
  }
}

export default App;