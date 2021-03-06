import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

class Prev_Quizzes extends Component {
    constructor() {
        super();
        this.state = {
                data : [],
                error : null,
                submitted : false,
        }
    }

    componentDidMount = () => {
        let id = localStorage.getItem("id")
        let url = 'http://127.0.0.1:8080/prevQuizzes/' + id
        const request = new Request(url);
        fetch(request)
          .then(response => response.json())
            .then(data => {this.setState({data: data})});
      }

    render () {
        let username = localStorage.getItem("username")
        if(username != null)
        {
            return (
                <div>
                    <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center fixed-top">
                        <Link className = "navbar-brand" to = "/">My Quiz App</Link>
                            <ul className="navbar-nav">
                            <li className="nav-item">
                            <Link to = "/attempt" className="nav-link">Attempt Quiz</Link>
                            </li>
                            <li className="nav-item">
                            <Link to = "/leaderboard" className="nav-link">Leaderboards</Link>
                            </li>
                            <li className = "nav-item">
                            <Link to = "/prevQuizzes" className = "nav-link">Previous Quizzes</Link>
                            </li>
                            <li className = "nav-item">
                            <Link to = "/signout" className = "nav-link">Signout</Link>
                            </li>
                        </ul>
                    </nav>
                    <br/>
                    <div className = "container">
                        <div className = "row justify-content-center">
                            <h2 className = "style-1 mt-5">Previous Quizzes</h2>
                        </div>
                        <table className="table table-hover">
                            <thead className = "thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>Genre</th>
                                <th>Total Score</th>
                                <th>Accuracy</th>
                            </tr>
                            </thead>
                            <tbody>{this.state.data.map(function(item, key) {
                                return (
                                    <tr key = {key} className = "table-info">
                                        <td>{item.name}</td>
                                        <td>{item.genre}</td>
                                        <td>{item.total_score}</td> 
                                        <td>{item.accuracy}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
        else
        {
            return (
                <div>
                    <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center fixed-top">
                        <Link className = "navbar-brand" to = "/">My Quiz App</Link>
                        <ul className="navbar-nav">
                            <li className = "nav-item">
                            <Link to = "/signup" className = "nav-link">Login/Signup</Link>
                            </li>
                        </ul>
                    </nav>
                    <br/>
                    <div className = "container-fluid">
                        <h1 className = "display-1 mt-5">Please Login first</h1>
                    </div>
                </div>
            )
        }
    }
}
export default Prev_Quizzes;