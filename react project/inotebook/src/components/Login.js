import React , {useState} from 'react'
import {useNavigate} from 'react-router-dom';
function Login(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    let history = useNavigate();

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password:credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if(json.success)
        {
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            history("/");
            props.showAlert("Logged in successfully", "success");
        }
        else
        {
            props.showAlert("invalid credendials", "danger");
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} onChange={onchange} name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onchange} value={credentials.password} name="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>

        </>
    )
}

export default Login