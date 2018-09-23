import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Profile from './profile';

    class Home extends Component {
        render() {
            var username = Profile.getName();
            if(username === "")
            {
                return (
                    <div>
                        <h1> Welcome </h1>
                        <Link to = {'/signup'} exact> Signup/Login </Link>
                    </div>
                );
            }
            else if(username !== "admin")
            {
                return (
                    <div>
                        <h1> Welcome {username} </h1>
                    </div>
                )
            }
            else
            {
                return (
                    <div>
                        <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            <Link to = "/" className="nav-link">Home</Link>
                            </li>
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
                        <h1> Welcome {username} </h1>

                    </div>
                )
            }
        }
    }
    export default Home;
