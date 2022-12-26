import "./App.css";
import Login from "./Components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Home from "./pages/Home/Home";
import Myforms from "./Components/Myforms/Myforms";
import PasswordReset from "./Components/PasswordReset/PasswordReset";
import { AuthProvider } from "./context/AuthContext";
import EmailVerify from "./Components/EmailVerify/EmailVerify";
import ResponsePage from "./pages/ResponsePage/ResponsePage";
import Temp from "./Components/Temporary/Temp";
function App() {
	return (
		<div className="App">
			<Router>
				<AuthProvider>
					<Temp />
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/" element={<Home />} />
						<Route path="/myforms" element={<Myforms />} />
						<Route path="/resetpass" element={<PasswordReset />} />
						<Route path="/emailverify" element={<EmailVerify />} />
						<Route path="/forms/responses" element={<ResponsePage />} />
					</Routes>
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;
