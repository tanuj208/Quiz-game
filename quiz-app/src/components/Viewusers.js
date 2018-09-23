import React, { Component } from 'react';
import Profile from './profile';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class View_Users extends Component {
    constructor() {
        super();
        this.state = {
          data: [],
          id : [],
        }
      }
    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/viewUsers');
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));
      }

    static contextTypes = {
         router : PropTypes.object,
    }
    handleSubmit = (event) => {
        event.preventDefault()
        for(let i in this.state.id)
        {
            fetch('http://localhost:8080/viewUsers/'+this.state.id[i], {
            method: 'DELETE',
          })
        }    
        this.context.router.history.push("/")    
      }

      handleClick = (id) => {
        this.state.id.push(id);
      }
        
      render () {
        var username = Profile.getName();
        if(username == "admin")
        {
            let deleteRow = this.handleClick;
            return (
                <div className="App">
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
                     <header className="App-header">
                        <h1 className="App-title">View All Users</h1>
                    </header>

                    <form onSubmit = {this.handleSubmit}>
                        <table className="table table-dark">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th> Delete user </th>
                            </tr>
                            </thead>
                            <tbody>{this.state.data.map(function(item, key) {
                                return (
                                    <tr key = {key}>
                                        <td>{item.id}</td>
                                        <td>{item.username}</td>
                                        <td><input type="radio"  onClick = {() => deleteRow(item.id)}/></td> 
                                    </tr>
                                )
                            })}
                                <button type = "submit" className = "btn btn-default btn-block"> Submit </button>
                            </tbody>
                        </table>
                    </form>
                </div>
            );
        }
        else
        {
            return(
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
                <h1>Access Denied</h1>
            </div>
            )
        }
    }
}
export default View_Users;