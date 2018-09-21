import React, { Component } from 'react';
import Profile from './profile';
import PropTypes from 'prop-types';


	class Signup_Login extends Component {
		constructor() {
			super();
			this.state = {
				loginData : {
					username : " ",
					password : " ",
				},
				registerData : {
					username : " ",
					password : " ",
				},
				loggedin : false,
				registered : false,
				error : null,
				rerror : null,
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
						Profile.setName(this.state.loginData.username)
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
			var username = Profile.getName();
			if(username == "")
			{
				let q = <p className="text-danger">{this.state.error}</p>
				let r = <p className = "text-danger"> {this.state.rerror}</p>
				return (
					<div>
						<h1> Login </h1>
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
						<h2> Register </h2>
						<form onSubmit = {this.handleRegister}>
							<div className = "form-group">
							<label> Enter Username </label>
							<input type  = "text" className = "form-control" id = "username" onChange = {this.handleRusername}/>
							</div>

							<div className = "form-group">
							<label> Enter password </label>
							<input type = "password" className = "form-control" id = "password" onChange = {this.handleRpassword}/> 
							</div>

							<button type = "submit" className = "btn btn-primary"> Register </button> 
							{r}
						</form>
					</div>
				);
			}
			else
			{
				return (
					<h1> You are already Logged in </h1>
				);
			}
		}
	}
	export default Signup_Login;
