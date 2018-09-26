import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Play extends Component {
    constructor() {
        super();
        this.state = {
                data : [],
                formData : {
                    score : 0,
                    percent : 0,
                    pid : null,
                }
        }
    }
    componentDidMount = () => {
        let url = 'http://127.0.0.1:8080/play/' + this.props.match.params.qzid
        const request = new Request(url);
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));
      }
        static contextTypes = {
        router : PropTypes.object,
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let totalScore = 0
        for(var i in this.state.data)
        {
            totalScore = totalScore + 1;
            if(((this.state.data[i].cha==undefined && this.state.data[i].ansa==false) || this.state.data[i].cha==this.state.data[i].ansa))
                if(((this.state.data[i].chb==undefined && this.state.data[i].ansb==false) || this.state.data[i].chb==this.state.data[i].ansb))
                    if(((this.state.data[i].chc==undefined && this.state.data[i].ansc==false) || this.state.data[i].chc==this.state.data[i].ansc))
                        if(((this.state.data[i].chd==undefined && this.state.data[i].ansd==false) || this.state.data[i].chd==this.state.data[i].ansd))
                            this.state.formData.score = this.state.formData.score + 1;
        }
        this.state.formData.percent = ( this.state.formData.score / totalScore ) * 100;
        let id = localStorage.getItem("id")
        this.state.formData.pid = id;
        let url = 'http://localhost:8080/play/' + this.props.match.params.qzid
        let url2 = '/score/' + this.state.formData.score + '/' + totalScore
        fetch(url,{
        method : 'POST',
        body : JSON.stringify(this.state.formData)
    })
            .then(response => {
                if(response.status >= 200 && response.status <= 300)
                    this.context.router.history.push(url2)
            })
    }

    addAnsA = (event,key) => {
		let y = [...this.state.data];
        if(event.target.checked==true)
            y[key].cha = true;
        else
            y[key].cha = false;
        
        this.setState({data : y});
    }

    addAnsB = (event, key) => {
		let y = [...this.state.data];
        if(event.target.checked==true)
            y[key].chb = true;
        else
            y[key].chb = false;
        this.setState({data : y});
    }
    
    addAnsC = (event, key) => {
		let y = [...this.state.data];
        if(event.target.checked==true)
            y[key].chc = true;
        else
            y[key].chc = false;
        this.setState({data : y});
    }
    
    addAnsD = (event, key) => {
		let y = [...this.state.data];
        if(event.target.checked==true)
            y[key].chd = true;
        else
            y[key].chd = false;
        this.setState({data : y});
    }

    render() {
        var username = localStorage.getItem("username")
        let addA = this.addAnsA
        let addB = this.addAnsB
        let addC = this.addAnsC
        let addD = this.addAnsD
        if(username != null)
        {
            return (
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
                    <br/>
                    <div className = "container">
                        <h2 className = "style-1 mt-5">Play</h2>
                        <table className = "table">
                            <tbody>{this.state.data.map(function(item, key) {
                                return (
                                    <div>
                                        <div className = "container bg-light rounded">
                                            <div className = "row">
                                                <div className = "col-1"><p>Q{key+1}</p></div>
                                                <div className = "col-9"><p>{item.statement}</p></div>
                                            </div>
                                            <div className = "row">
                                                <div className = "col-4"><p>{item.opa}</p></div>
                                                <div className = "col-1">
                                                    <input type = "checkbox" class = "form-check-input" onClick = {(event) => addA(event, key)}/>
                                                </div>
                                                <div className = "col-4"><p>{item.opb}</p></div>
                                                <div className = "col-1">
                                                    <input type = "checkbox" class = "form-check-input" onChange = {(event) => addB(event, key)}/>
                                                </div>
                                            </div>
                                            <div className = "row">
                                                <div className = "col-4"><p>{item.opc}</p></div>
                                                <div className = "col-1">
                                                    <input type = "checkbox" class = "form-check-input" onChange = {(event) => addC(event, key)}/>
                                                </div>
                                                <div className = "col-4"><p>{item.opd}</p></div>
                                                <div className = "col-1">
                                                    <input type = "checkbox" class = "form-check-input" onChange = {(event) => addD(event, key)}/>
                                                </div>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                    )})}
                            </tbody>
                        </table>
                        <button className = "btn btn-primary" onClick = {this.handleSubmit}>Submit</button>
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
                    <br/>
                    <div className = "container-fluid">
                        <h1 className = "display-1 mt-5"> Please Login first </h1>
                    </div>
                </div>
            )
        }
    }
}
export default Play;
