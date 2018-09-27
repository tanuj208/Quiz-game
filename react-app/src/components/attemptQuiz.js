import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Attempt extends Component {
    constructor() {
        super();
        this.state = {
          data: [],
          id : null,
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

      handlePlay = (event) => {
            event.preventDefault()
            if(this.state.id == null)
                return
          this.context.router.history.push('/play/' + this.state.id)
      }

      handleClick = (id) => {
        this.setState({id : id})
      }
        
      render () {
        var username = localStorage.getItem("username")
        if(username != null)
        {
            let click = this.handleClick;
            return (
                <div className="App">
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
                    <div className = "container">
                        <h2 className="style-1 mt-5">Attempt one of the Quizzes</h2>
                        <table className="table">
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
                                    <tr key = {key} className = "table-warning">
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.genre}</td> 
                                        <td><input name = "q" type="radio"  onClick = {() => click(item.id)}/></td> 
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        <button className = "btn btn-warning" onClick = {this.handlePlay}> Play </button>
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
                            <li className = "nav-item">
                            <Link to = "/signup" className = "nav-link">Login/Signup</Link>
                            </li>
                        </ul>
                    </nav>
                    <br/>
                    <h1 className = "display-1 mt-5">Please Login first</h1>
                </div>
            )
        }
    }
}
export default Attempt;