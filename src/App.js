import { useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import PasswordReset from "./Components/PasswordReset/PasswordReset";
import EmailVerify from "./Components/EmailVerify/EmailVerify";
import Loading from "./Components/Loading/Loading";
import Authentication from "./pages/Authentication/Authentication";
import NotFound from "./pages/404/NotFound";
import "./App.css";
import Submit from "./pages/Submit/Submit";

function MainApp() {
	const { currentUser } = useAuth();

	useEffect(() => {
		let vh = window.innerHeight;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
		window.addEventListener("resize", function () {
			let vh = window.innerHeight;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		});
		window.addEventListener("load", function () {
			let vh = window.innerHeight;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		});
	}, []);
	return (
		<div className="App">
			<Toaster />

			<Router>
				<Routes>
					<Route
						exact
						path="/"
						element={
							currentUser ? (
								currentUser.emailVerified ? (
									<Navigate to="/user" />
								) : (
									<Navigate to="/emailverify" />
								)
							) : (
								<Navigate to="/auth" />
							)
						}
					/>
					<Route
						path="/auth"
						element={currentUser ? <Navigate to="/" /> : <Authentication />}
					/>
					<Route
						path="/user/*"
						element={
							currentUser ? (
								currentUser.emailVerified ? (
									<Home />
								) : (
									<Navigate to="/emailverify" />
								)
							) : (
								<Navigate to="/auth" />
							)
						}
					/>
					<Route path="/resetpass" element={<PasswordReset />} />
					<Route
						path="/emailverify"
						element={
							currentUser ? (
								currentUser.emailVerified ? (
									<Navigate to="/user" />
								) : (
									<EmailVerify />
								)
							) : (
								<Navigate to="/auth" />
							)
						}
					/>
					<Route path="/form/:id" element={<Submit />} />
					<Route path="*" element={<NotFound />} />
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
