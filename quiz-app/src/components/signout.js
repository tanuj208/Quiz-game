import React, { Component } from 'react';
import Profile from './profile';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Signout extends Component {

    static contextTypes = {
        router : PropTypes.object,
    }

    logout = () => {
        Profile.setName("")
    }
    render() {
        this.logout()
        return (
            <div>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <Link to = "/" className="nav-link">Home</Link>
                        </li>
                        <li className = "nav-item">
                        <Link to = "/signup" className = "nav-link">Login/Signup</Link>
                        </li>
                    </ul>
                </nav>
                <h1> You have been logged out </h1>
            </div>
        )
    }
    
}
export default Signout
