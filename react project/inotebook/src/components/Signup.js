import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup(props) {
	const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: ""  });

	let history = useNavigate();

	const onchange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	}



	const handleSubmit = async (e) => {
		e.preventDefault();
		fetch();
		const {name ,email ,password} = credentials;
		const response = await fetch("http://localhost:5000/api/auth/createuser", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, email, password })
		});
		const json = await response.json();
		console.log(json);
		if (json.success) {
			// save the auth token and redirect
			localStorage.setItem('token', json.authtoken);
			history("/");
			props.showAlert("Account created successfully", "success");
		}
		else {
			props.showAlert("invalid details", "danger");
		}
	}
	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name">name</label>
					<input type="text" className="form-control" id="name" name="name" onChange={onchange} placeholder="name" />
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">Email address</label>
					<input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={onchange} aria-describedby="emailHelp" placeholder="Enter email" />
					<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input type="password" className="form-control" id="password" name="password" onChange={onchange} placeholder="Password" />
				</div>
				<div className="form-group">
					<label htmlFor="cpassword">Confirm Password</label>
					<input type="password" className="form-control" id="cpassword" name="cpassword" placeholder="Password" />
				</div>
				<button type="submit" className="btn btn-primary">signup</button>
			</form>
		</div>
	)
}

export default Signup