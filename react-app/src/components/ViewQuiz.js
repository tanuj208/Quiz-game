import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class View_Quizzes extends Component {
    constructor() {
        super();
        this.state = {
          data: [],
          id : null,
          name : null,
        }
      }
      componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/viewQuizzes');
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));
      }

        static contextTypes = {
            router : PropTypes.object,
        }

        handleDelete = (event) => {
        event.preventDefault()
        if(this.state.id == null)
            return;
        fetch('http://localhost:8080/viewQuizzes/'+this.state.id, {
            method: 'DELETE',
          }).then(response => {
              if(response.status >=200 && response.status <=300)
                  window.location.reload()
                });
      }

      handleEdit = (event) => {
            event.preventDefault()
          if(this.state.name == null)
                return
          this.context.router.history.push('/editQuiz/' + this.state.name)
      }

      handleClick = (id, name) => {
        this.setState({id : id})
        this.setState({name : name})
      }
        
      render () {
        var username = localStorage.getItem("username")
        if(username == "admin")
        {
            let click = this.handleClick;
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
                        <h2 className="style-1 mt-5">All Quizzes</h2>
                        <form>
                            <table className="table table-hover">
                                <thead className = "thead-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Genre</th>
                                    <th>Select</th>
                                </tr>
                                </thead>
                                <tbody>{this.state.data.map(function(item, key) {
                                    return (
                                        <tr key = {key} className = "table-success">
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.genre}</td> 
                                            <td><input name = "q" type="radio"  onClick = {() => click(item.id, item.name)}/></td> 
                                        </tr>
                                    )
                                })}
                                </tbody>
                                </table>
                                <button className = "btn btn-danger" onClick = {this.handleDelete}> Delete </button>
                                <button className = "btn btn-warning" onClick = {this.handleEdit}> Edit </button>
                        </form>
                    </div>
                </div>
            );
        }
        else
        {
            return (
                <div>
                    <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center fixed-top">
                        <Link className = "navbar-brand" to = "/">My Quiz App</Link>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            <Link to = "/" className="nav-link">Home</Link>
                            </li>
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
export default View_Quizzes;