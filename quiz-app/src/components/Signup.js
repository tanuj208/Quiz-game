import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

	class Signup_Login extends Component {
		constructor() {
			super();
			this.state = {
				loginData : {
					username : "",
					password : "",
				},
				registerData : {
					username : "",
					password : "",
				},
				loggedin : false,
				registered : false,
				error : null,
				rerror : null,
				id : null,
			}
		}
		static contextTypes = {
			router : PropTypes.object,
		}
	
		  handleLogin = (event) => {
			event.preventDefault()
			fetch('http://localhost:8080/signin',{
			method : 'POST',
			body : JSON.stringify(this.state.loginData),
		})
				.then(response => {
					if(response.status >= 200 && response.status <= 300)
					{
						response.json()
						.then(data => {localStorage.setItem('id', data)})
						localStorage.setItem('username', this.state.loginData.username)
						this.setState({loggedin : true})
						this.context.router.history.push("/")
					}
					else {
						response.json()
						.then(data => this.setState({"error" : data.error}))
					}
				})
		}

		handleRegister = (event) => {
			event.preventDefault()
			fetch('http://localhost:8080/register',{
				method : 'POST',
				body : JSON.stringify(this.state.registerData),
			})
					.then(response => {
						if(response.status >= 200 && response.status <= 300)
							this.setState({registered : true});
						else {
							response.json()
							.then(data => this.setState({"rerror" : data.error}))
						}
					});
			}
	
			handleLusername = (event) => {
				let y = {...this.state.loginData , "username" : event.target.value};
				this.setState({loginData : y})
			}
			handleLpassword = (event) => {
				let y = {...this.state.loginData , "password" : event.target.value};
				this.setState({loginData : y})
			}

			handleRusername = (event) => {
				let y = {...this.state.registerData , "username" : event.target.value};
				this.setState({registerData : y})
			}
			handleRpassword = (event) => {
				let y = {...this.state.registerData , "password" : event.target.value};
				this.setState({registerData : y})
			}

		render() {
			var username = localStorage.getItem('username')
			if(username == null)
			{
				let q = <p className="text-danger">{this.state.error}</p>
				let r = <p className = "text-danger"> {this.state.rerror}</p>
				return (
					<div className = "container">
						<nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center fixed-top">
							<Link className = "navbar-brand" to = "/">My Quiz App</Link>
							<ul className="navbar-nav">
								<li className = "nav-item">
								<Link to = "/signup" className = "nav-link">Login/Signup</Link>
								</li>
							</ul>
						</nav>
						<br/>
                        <div className = "row justify-content-center">
                            <h2 className = "style-1 mt-5">Login</h2>
                        </div>
						<div className = "row justify-content-center bg-light rounded">
							<form onSubmit = {this.handleLogin}>
							<div className="form-group">
								<label>Username:</label>
								<input type="text" className="form-control" id="Lusername" onChange = {this.handleLusername}/>
							</div>

							<div className="form-group">
								<label>Password:</label>
								<input type="password" className="form-control" id="pwd" onChange = {this.handleLpassword}/>
							</div>
							
							<button type="submit" className="btn btn-primary">Login</button>
							{q}
							</form>
						</div>
						<br/>
                        <div className = "row justify-content-center">
                            <h2 className = "style-1">Register</h2>
                        </div>
						<div className = "row justify-content-center bg-light rounded">
							<form onSubmit = {this.handleRegister}>
								<div className = "form-group">
								<label> Enter Username </label>
								<input type  = "text" className = "form-control" id = "username" onChange = {this.handleRusername}/>
								</div>

								<div className = "form-group">
								<label> Enter password </label>
								<input type = "password" className = "form-control" id = "password" onChange = {this.handleRpassword}/> 
								</div>

								<button type = "submit" className = "btn btn-primary">Register</button> 
								{r}
							</form>
						</div>
					</div>
				);
			}
			else if(username == "admin")
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
						<h1 className = "style-1 mt-5"> You are already Logged in </h1>
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
						<h1 className = "style-1 mt-5"> You are already Logged in </h1>
					</div>
				);
			}
		}
	}
	export default Signup_Login;
