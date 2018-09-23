import React, { Component } from 'react';
import Profile from './profile';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Edit_Ques extends Component {
    constructor() {
        super();
        this.state = {
                data : {
                    statement : "",
                    opa : "",
                    opb : "",
                    opc : "",
                    opd : "",
                    ansa : false,
                    ansb : false, 
                    ansc : false,
                    ansd : false,
                },
                error : null,
                submitted : false,
        }
    }

    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/editQues/' + this.props.match.params.quizName + '/' + this.props.match.params.qid);
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));
      }
    
    static contextTypes = {
        router : PropTypes.object,
    }
    
    handleSubmit = (event) => {
        event.preventDefault()

        let url = "/editQuiz/"+this.props.match.params.quizName        
        const request = 'http://localhost:8080/editQues/'+this.props.match.params.quizName+ '/' + this.props.match.params.qid
        fetch(request, {
            method : 'POST',
            body : JSON.stringify(this.state.data)
        })
            .then(response => {
                if(response.status >= 200 && response.status <=300)
                {
                    this.setState({submitted : true});
					this.context.router.history.push(url)
                }
                else {
                    response.json()
                    .then(data => this.setState({ "error" : data.error}))
                }
            });
    }

    StatementChange = (event) => {
		let y = {...this.state.data , "statement" : event.target.value};
		this.setState({data : y})
    }

    OptionA_Change = (event) => {
		let y = {...this.state.data , "opa" : event.target.value};
		this.setState({data : y})
    }

    OptionB_Change = (event) => {
		let y = {...this.state.data , "opb" : event.target.value};
		this.setState({data : y})
    }

    OptionC_Change = (event) => {
		let y = {...this.state.data , "opc" : event.target.value};
		this.setState({data : y})
    }

    OptionD_Change = (event) => {
		let y = {...this.state.data , "opd" : event.target.value};
		this.setState({data : y})
    }

    ansA = () => {
        var x = document.getElementById('opa')
		let y = {...this.state.data , "ansa" : true};
		let z = {...this.state.data , "ansa" : false};
        if(x.checked==true)
            this.setState({data : y});
        else
            this.setState({data : z});
    }

    ansB = () => {
        var x = document.getElementById('opb')
		let y = {...this.state.data , "ansb" : true};
		let z = {...this.state.data , "ansb" : false};
        if(x.checked==true)
            this.setState({data : y});
        else
            this.setState({data : z});
    }
    
    ansC = () => {
        var x = document.getElementById('opc')
		let y = {...this.state.data , "ansc" : true};
		let z = {...this.state.data , "ansc" : false};
        if(x.checked==true)
            this.setState({data : y});
        else
            this.setState({data : z});
    }
    
    ansD = () => {
        var x = document.getElementById('opd')
		let y = {...this.state.data , "ansd" : true};
		let z = {...this.state.data , "ansd" : false};
        if(x.checked==true)
            this.setState({data : y});
        else
            this.setState({data : z});
    }

    render () {
        var username = Profile.getName();
        let r = <p className = "text-danger"> {this.state.error}</p>
        if(username === "admin")
        {
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
                    <h2> Add question </h2>
                    <div>
                        <form onSubmit = {this.handleSubmit}>
                        <div className = "form-group">
                            <label for = "ques">Question:</label>
                            <input type = "text" class = "form-control" value = {this.state.data.statement} onChange = {this.StatementChange}/>
                        </div>
                        <div className = "form-group">
                            <label for = "opa">Option A:</label>
                            <input type = "text" class = "form-control" value = {this.state.data.opa} onChange = {this.OptionA_Change}/>
                            <input type="checkbox" class="form-check-input" id="opa" onChange = {this.ansA}/>Correct
                        </div>
                        <div className = "form-group">
                            <label for = "opb">Option B:</label>
                            <input type = "text" class = "form-control" value = {this.state.data.opb} onChange = {this.OptionB_Change}/>
                            <input type="checkbox" class="form-check-input" id="opb" onChange = {this.ansB}/>Correct
                        </div>
                        <div className = "form-group">
                            <label for = "opc">Option C:</label>
                            <input type = "text" class = "form-control" value = {this.state.data.opc} onChange = {this.OptionC_Change}/>
                            <input type="checkbox" class="form-check-input" id="opc" onChange = {this.ansC}/>Correct
                        </div>
                        <div className = "form-group">
                            <label for = "opd">Option D:</label>
                            <input type = "text" class = "form-control" value = {this.state.data.opd} onChange = {this.OptionD_Change}/>
                            <input type="checkbox" class="form-check-input" id="opd" onChange = {this.ansD}/>Correct
                        </div>
                        <button type = "submit" className = "btn btn-primary"> Add </button> 
                        {r}
                    </form>
                    </div>
                </div>
            ) 
        }
        else
        {
            return (
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
export default Edit_Ques