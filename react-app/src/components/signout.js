import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Signout extends Component {

    logout = () => {
        localStorage.clear()
    }
    render() {
        let username = localStorage.getItem("username")
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
                    <h1 className = "style-1 mt-5"> You are already logged out </h1>
                </div>
            )
        }
        else
        {
            this.logout()
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
                    <h1 className = "style-1 mt-5"> You have been logged out </h1>
                </div>
            )
        }
    }
    
}
export default Signout
