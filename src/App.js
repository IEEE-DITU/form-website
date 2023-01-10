import "./App.css";
import Login from "./Components/Login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Home from "./pages/Home/Home";
import PasswordReset from "./Components/PasswordReset/PasswordReset";
import EmailVerify1 from "./Components/EmailVerify/EmailVeify1";
import ResponsePage from "./pages/ResponsePage/ResponsePage";
import Temp from "./Components/Temporary/Temp";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

import Loading from "./Components/Loading/Loading";
import CreateForm from "./Components/CreateForm/CreateForm";

function MainApp() {
	const { currentUser } = useAuth();
	return (
		<div className="App">
			<Toaster />

      <Router>
        <Temp />
        <Routes>
          <Route
            path="/login"
            element={currentUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={currentUser ? <Navigate to="/" /> : <Signup />}
          />
           <Route
						exact
						path="/"
						element={
							currentUser ? (
								currentUser.emailVerified ? (
									<Home />
								) : (
									<Navigate to="/verify" />
								)
							) : (
								<Navigate to="/login" />
							)
						}
					/>
					<Route path="/resetpass" element={<PasswordReset />} />
					<Route
						path="/verify"
						element={
							currentUser ? (
								currentUser.emailVerified ? (
									<Navigate to="/" />
								) : (
									<EmailVerify1 />
								)
							) : (
								<Navigate to="/login" />
							)
						}
					/>
					
					<Route
						path="/forms/responses"
						element={
							currentUser ? (
								currentUser.emailVerified ? (
									<ResponsePage />
								) : (
									<Navigate to="/verify" />
								)
							) : (
								<Navigate to="/login" />
							)
						}
					/>
					<Route
						path="/newform"
						element={
							currentUser ? (
								currentUser.emailVerified ? (
									<CreateForm />
								) : (
									<Navigate to="/verify" />
								)
							) : (
								<Navigate to="/login" />
							)
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}
function App() {
	const { loading } = useAuth();
	return <>{loading ? <Loading /> : <MainApp />}</>;
}

export default App;
