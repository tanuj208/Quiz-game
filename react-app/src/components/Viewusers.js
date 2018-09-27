import React, { Component } from 'react';
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
        if(id == 1)
           return
        this.state.id.push(id);
      }
        
      render () {
        var username = localStorage.getItem("username")
        if(username == "admin")
        {
            let deleteRow = this.handleClick;
            return (
                <div className="App">
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
                    <div className = "container">
                        <h1 className="style-1 mt-5">View All Users</h1>
                        <form onSubmit = {this.handleSubmit}>
                            <table className="table table-hover">
                                <thead className = "thead-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th> Delete user </th>
                                </tr>
                                </thead>
                                <tbody>{this.state.data.map(function(item, key) {
                                    return (
                                        <tr key = {key} className = "table-danger">
                                            <td>{item.id}</td>
                                            <td>{item.username}</td>
                                            <td><input type="radio"  onClick = {() => deleteRow(item.id)}/></td> 
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                            <button type = "submit" className = "btn btn-danger"> Delete </button>
                        </form>
                    </div>
                </div>
            );
        }
        else
        {
            return(
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
                <h1 className = "style-1 mt-5">Access Denied</h1>
            </div>
            )
        }
    }
}
export default View_Users;