import React, { Component } from 'react';
import { Link } from 'react-router-dom';

    class Home extends Component {
        render() {
            var username = localStorage.getItem("username");
            if(username == null)
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
                            <h1 className = "display-1 mt-5"> Welcome </h1>
                        </div>
                    </div>
                );
            }
            else if(username !== "admin")
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
                        <h1 className = "display-1 mt-5"> Welcome {username} </h1>
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
                                <li className="nav-item">
                                <Link to = "/viewQuizzes" className="nav-link">View Quiz</Link>
                                </li>
                                <li className="nav-item">
                                <Link to = "/createQuiz" className="nav-link">Create Quiz</Link>
                                </li>
                                <li className = "nav-item">
                                <Link to = "/viewUsers" className = "nav-link">View Users</Link>
                                </li>
                                <li className = "nav-item">
                                <Link to = "/signout" className = "nav-link">Signout</Link>
                                </li>
                            </ul>
                        </nav>
                        <br/>
                        <h1 className = "display-1 mt-5"> Welcome {username} </h1>
                    </div>
                )
            }
        }
    }
    export default Home;
