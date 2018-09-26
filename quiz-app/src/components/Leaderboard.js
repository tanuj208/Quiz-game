import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Leaderboard extends Component {
    constructor() {
        super();
        this.state = {
                data : [],
        }
    }

    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/viewQuizzes');
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));
      }

    render() {
        let username = localStorage.getItem("username")
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
                    <div className = "container">
                        <br/>
                        <div className = "row justify-content-center">
                            <h2 className = "style-1 mt-5"> Get overall leaderboard </h2>
                        </div>
                        <div className = "list-group">
                            <Link to = "/overallLeaderboard" class="list-group-item list-group-item-primary btn-primary">Overall</Link>
                        </div>
                        <br/>
                        <div className = "row justify-content-center">
                            <h2 className = "style-1"> Get leaderboard by genre</h2>
                        </div>
                        <div className = "list-group">
                            <Link to = "/genreLeaderboard/Friends" class="list-group-item list-group-item-success btn-success">Friends</Link>
                            <Link to = "/genreLeaderboard/Cricket" class="list-group-item list-group-item-info btn-info">Cricket</Link>
                            <Link to = "/genreLeaderboard/gk" class="list-group-item list-group-item-warning btn-warning">General Knowledge</Link>
                            <Link to = "/genreLeaderboard/Maths" class="list-group-item list-group-item-danger btn-danger">Maths</Link>
                        </div>
                        <br/>
                        <div className = "row justify-content-center">
                            <h2 className = "style-1"> Get leaderboard by individual quiz</h2>
                        </div>
                        <div className = "list-group">
                            <table className = "table">
                                <thead className = "thead-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Genre</th>
                                    <th>Link</th>
                                </tr>
                                </thead>
                                <tbody>{this.state.data.map(function(item, key) {
                                    let link = "/quizLeaderboard/" + item.id
                                    return (
                                        <tr key = {key} className = "table-light">
                                            <td>{item.name}</td>
                                            <td>{item.genre}</td> 
                                            <td><Link to = {link} class="list-group-item list-group-item-dark btn-dark">Link</Link></td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
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
                    <div className = "container-fluid">
                        <h1 className = "display-1 mt-5"> Please Login first </h1>
                    </div>
                </div>
            )
        }
    }
}
export default Leaderboard;