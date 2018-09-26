import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Signup_Login from  './Signup';
import Home from './Home';
import View_Users from './Viewusers';
import View_Quizzes from './ViewQuiz';
import Create_Quiz from './createQuiz';
import Add_Ques from './addQuestion';
import Edit_Quiz from './editQuiz';
import Edit_Ques from './editQues';
import Signout from './signout';
import Attempt from './attemptQuiz';
import Play from './playQuiz';
import Show_Score from './showScore';
import Leaderboard from './Leaderboard';
import Overall_Leaderboard from './overallLeaderboard';
import Genre_Leaderboard from './genreLeaderboard';
import Quiz_Leaderboard from './quizLeaderboard';
import Prev_Quizzes from './previousQuizzes';

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
            <Route exact path = '/addQues/:quizName' component = {Add_Ques} />
            <Route exact path = '/editQuiz/:quizName' component = {Edit_Quiz} />
            <Route exact path = '/editQues/:quizName/:qid' component = {Edit_Ques} />
            <Route exact path = '/viewQuizzes' component = {View_Quizzes} />
            <Route exact path = '/signout' component = {Signout} />
            <Route exact path = '/attempt' component = {Attempt} />
            <Route exact path = '/play/:qzid' component = {Play} />
            <Route exact path = '/score/:sc/:t' component = {Show_Score} />
            <Route exact path = '/leaderboard' component = {Leaderboard} />
            <Route exact path = '/overallLeaderboard' component = {Overall_Leaderboard} />
            <Route exact path = '/genreLeaderboard/:genre' component = {Genre_Leaderboard} />
            <Route exact path = '/quizLeaderboard/:qzid' component = {Quiz_Leaderboard} />
            <Route exact path = "/prevQuizzes" component = {Prev_Quizzes} />
          </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
