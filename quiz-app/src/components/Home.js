import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Profile from './profile';

    class Home extends Component {
        render() {
            var username = Profile.getName();
            if(username == "")
            {
                return (
                    <div>
                        <h1> Welcome </h1>
                        <Link to = {'/signup'} exact> Signup/Login </Link>
                    </div>
                );
            }
            else if(username == "admin")
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
                        <h1> Welcome {username} </h1>
                    </div>
                )
            }
        }
    }
    export default Home;
