import React, { Component } from 'react';
import './App.css';
import Signup_Login from  './Signup';
import Home from './Home';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';


class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
          <Switch>
            <Route exact path = '/' component = {Home} />
            <Route exact path = '/signup'  component = {Signup_Login} />
          </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
