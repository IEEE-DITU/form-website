import "./App.css";
import Login from "./Components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Home from "./pages/Home/Home";
import ResponsePage from "./pages/ResponsePage/ResponsePage";
function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/" element={<Home />} />
					<Route path="/forms/responses" element={<ResponsePage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
