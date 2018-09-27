import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Show_Score extends Component {

    render() {
        let username = localStorage.getItem("username")
        let a = this.props.match.params.sc
        let b = this.props.match.params.t
        if(username != null)
        {
            return(
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
                    <h1 className = "display-1 mt-5"> You scored {a} out of {b} </h1>
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
                    <div className = "container">
                        <h1 className = "display-1 mt-5"> Please Login first </h1>
                    </div>
                </div>
            )
        }
    }
}
export default Show_Score;
