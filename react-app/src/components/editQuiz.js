import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Edit_Quiz extends Component {
    constructor() {
        super();
        this.state = {
                data : [],
                error : null,
                submitted : false,
                ques : null,
        }
    }
    componentDidMount = () => {
        let quizName = this.props.match.params.quizName
        const request = new Request('http://127.0.0.1:8080/editQuiz/'+quizName);
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));
      }
        static contextTypes = {
        router : PropTypes.object,
    }

    setid = (id) => {
        this.setState({ques : id})
    }

    handleEdit = (event) => {
        event.preventDefault()
        if(this.state.ques == null)
            return
        let url = '/editQues/' + this.props.match.params.quizName + '/' + this.state.ques
        this.context.router.history.push(url)
    }

    handleEvent = (event) => {
        event.preventDefault()
        let url = '/addQues/' + this.props.match.params.quizName
        this.context.router.history.push(url)
    }

    handleDelete = (event) => {
        event.preventDefault()
        let url = 'http://localhost:8080/editQuiz/' + this.props.match.params.quizName + '/' + this.state.ques
        fetch(url, {
            method : 'DELETE',
        }).then(response => {
            if(response.status >=200 && response.status <=300)
                window.location.reload()
              });
    }

    render() {
        var username = localStorage.getItem("username");
        let addId = this.setid
        if(username == "admin")
        {
            return (
                <div>
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
                    <h2 className = "style-1 mt-5">Edit Quiz</h2>
                    <div className = "container">
                        <table className = "table table-hover">
                            <thead className = "thead-dark">
                                <tr>
                                    <th>Qno</th>
                                    <th>Statement</th>
                                    <th>Option A</th>
                                    <th>Option B</th>
                                    <th>Option C</th>
                                    <th>Option D</th>
                                    <th>Select</th> 
                                </tr>
                            </thead>
                            <tbody>{this.state.data.map(function(item, key) {
                                return (
                                    <tr key = {key} className = "table-primary">
                                        <td>{key+1}</td>
                                        <td>{item.statement}</td>
                                        <td>{item.opa}</td>
                                        <td>{item.opb}</td>
                                        <td>{item.opc}</td>
                                        <td>{item.opd}</td>
                                        <td><input type="radio" name = "q" onClick = {() => addId(item.id)}/></td> 
                                    </tr>
                                    )})}
                            </tbody>
                        </table>
                        <button className = "btn btn-warning" onClick = {this.handleEdit}>Edit Question</button>
                        <button className = "btn btn-success" onClick = {this.handleEvent}>Add a new Question</button>
                        <button className = "btn btn-danger" onClick = {this.handleDelete}>Delete Question</button>
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
                            <li className="nav-item">
                            <Link to = "/" className="nav-link">Home</Link>
                            </li>
                            <li className = "nav-item">
                            <Link to = "/signup" className = "nav-link">Login/Signup</Link>
                            </li>
                        </ul>
                    </nav>
                    <br/>
                    <h1 className = "display-1 mt-5"> Access Denied </h1>
                </div>
            )
        }
    }
}
export default Edit_Quiz;
