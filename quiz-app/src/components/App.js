import React, { Component } from 'react';
import './App.css';
import Signup_Login from  './Signup';
import Home from './Home';
import View_Users from './Viewusers';
import View_Quizzes from './ViewQuiz';
import Create_Quiz from './createQuiz';
import Edit_Quiz from './editQuiz';
import Edit_Ques from './editQues';
import Signout from './signout';
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
            <Route exact path = '/viewUsers' component = {View_Users} />
            <Route exact path = '/createQuiz' component = {Create_Quiz} />
            <Route exact path = '/editQuiz/:quizName' component = {Edit_Quiz} />
            <Route exact path = '/editQues/:quizName/:qid' component = {Edit_Ques} />
            <Route exact path = '/viewQuizzes' component = {View_Quizzes} />
            <Route exact path = '/signout' component = {Signout} />
          </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
