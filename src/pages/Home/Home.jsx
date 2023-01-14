import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Newform from "../../Containers/Newform/Newform";
import Dashboard from "../../Containers/Dashboard/Dashboard";
import NotFound from "../404/NotFound";
import Response from "../../Containers/Response/Response";
import EditForm from "../../Containers/EditForm/EditForm";
import Verify from "../../Components/Verify/Verify";
import "./Home.css";

const Home = () => {
	const { currentUser } = useAuth();
	return (
		<div className="Home">
			<div className="HomeContent">
				<Routes>
					<Route
						path="/"
						element={
							currentUser.emailVerified ? (
								<Navigate to="/user/dashboard" />
							) : (
								<Navigate to="/user/verify" />
							)
						}
					/>
					<Route
						path="/dashboard"
						element={
							currentUser.emailVerified ? (
								<Dashboard />
							) : (
								<Navigate to="/user/verify" />
							)
						}
					/>
					<Route
						path="/newform"
						element={
							currentUser.emailVerified ? (
								<Newform />
							) : (
								<Navigate to="/user/verify" />
							)
						}
					/>
					<Route
						path="/verify"
						element={
							currentUser.emailVerified ? <Navigate to="/" /> : <Verify />
						}
					/>
					<Route
						path="/form/checkresponse/:id"
						element={
							currentUser.emailVerified ? (
								<Response />
							) : (
								<Navigate to="/user/verify" />
							)
						}
					/>
					<Route
						path="/form/edit/:id"
						element={
							currentUser.emailVerified ? (
								<EditForm />
							) : (
								<Navigate to="/user/verify" />
							)
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</div>
	);
};

export default Home;
