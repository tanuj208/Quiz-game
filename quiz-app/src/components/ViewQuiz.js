import React, { Component } from 'react';
import Profile from './profile';
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
        if(this.state.id == null)
            return;
        event.preventDefault()
        fetch('http://localhost:8080/viewQuizzes/'+this.state.id, {
            method: 'DELETE',
          })
        this.context.router.history.push("/")    
      }

      handleEdit = () => {
          this.context.router.history.push('/editQuiz/' + this.state.name)
      }

      handleClick = (id, name) => {
        this.state.id = id;
        this.state.name = name;
      }
        
      render () {
        var username = Profile.getName();
        if(username == "admin")
        {
            let click = this.handleClick;
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
                        <h1 className="App-title">All Quizzes</h1>
                    </header>

                    <form>
                        <table className="table table-dark">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Genre</th>
                                <th>Select</th>
                            </tr>
                            </thead>
                            <tbody>{this.state.data.map(function(item, key) {
                                return (
                                    <tr key = {key}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.genre}</td> 
                                        <td><input name = "q" type="radio"  onClick = {() => click(item.id, item.name)}/></td> 
                                    </tr>
                                )
                            })}
                                <button className = "btn btn-default" onClick = {this.handleDelete}> Delete </button>
                                <button className = "btn btn-default" onClick = {this.handleEdit}> Edit </button>
                            </tbody>
                        </table>
                    </form>
                </div>
            );
        }
        else
        {
            return (
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
export default View_Quizzes;