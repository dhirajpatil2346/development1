import './App.css';
import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
function App() {

	const showAlert = (message, type) => {
		setAlert({
			msg: message,
			type: type,
		});
		setTimeout(() => {
			setAlert(null);
		}, 3000);
	};

	const [alert, setAlert] = useState(null);
	return (
		<>
			<NoteState>
				<Router>
					<Navbar />
					<Alert alert={alert} />
					<div className='container my-3'>
						<Routes>
							<Route exact path="/about" element={<About />}></Route>
							<Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
							<Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
							<Route exact path="/signup" element={<Signup showAlert={showAlert} />}></Route>
						</Routes>
					</div>
				</Router>
			</NoteState>
		</>
	);
}

export default App;
