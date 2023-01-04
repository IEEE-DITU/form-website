import { Navigate, Route, Routes } from "react-router-dom";
import Newform from "../../Containers/Newform/Newform";
import Dashboard from "../../Containers/Dashboard/Dashboard";
import "./Home.css";

const Home = () => {
	return (
		<div className="Home">
			<div className="HomeContent">
				<Routes>
					<Route path="/" element={<Navigate to="/user/dashboard" />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/newform" element={<Newform />} />
				</Routes>
			</div>
		</div>
	);
};

export default Home;
