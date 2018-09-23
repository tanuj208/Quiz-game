import React, { Component } from 'react';
import Profile from './profile';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class Create_Quiz extends Component {
    constructor() {
        super();
        this.state = {
            data : {
                name : "",
                genre : "Friends",
            },
            error : null,
            submitted : false,
        }
    }
    static contextTypes = {
        router : PropTypes.object,
    }

    handleName = (event) => {
        let y = {...this.state.data , "name" : event.target.value};
        this.setState({data : y})
    }
    handleGenre = (event) => {
        let y = {...this.state.data , "genre" : event.target.value};
        this.setState({data : y})
    }
    handleSubmit = (event) => {
        event.preventDefault()
        fetch('http://localhost:8080/createQuiz',{
            method : 'POST',
            body : JSON.stringify(this.state.data),
        })
                .then(response => {
                    if(response.status >= 200 && response.status <= 300)
                    {
                        this.setState({submitted : true});
						this.context.router.history.push("/editQuiz/"+this.state.data.name)
                    }
                    else {
                        response.json()
                        .then(data => this.setState({"error" : data.error}))
                    }
                });
    }

    render () {
        var username = Profile.getName();
        if(username == "admin")
        {
            let q = <p className="text-danger">{this.state.error}</p>
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
                    <h1> Create Quiz </h1>
                    <form onSubmit = {this.handleSubmit}>
                        <div className = "form-group">
                            <label for = "name">Quiz Name:</label>
                            <input type = "text" className = "form-control" id = "name" onChange = {this.handleName}/>
                        </div>
                        <div className = "form-group">
                            <label for = "genre">Select Genre:</label>
                            <select className = "form-control" id = "sel1" onChange = {this.handleGenre}>
                                <option>Friends</option>
                                <option>Cricket</option>
                                <option>General Knowledge</option>
                                <option>Maths</option>
                            </select>
                        </div>
                        <button type = "submit" className = "btn btn-primary">Submit</button>
                        {q}
                    </form> 
                    </div>
                )
        }
        else
        {
            return(
                <div>
                    <h1>Access Denied</h1>
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
                </div>
            )
        }
    }
}
export default Create_Quiz;