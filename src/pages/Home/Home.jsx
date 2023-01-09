import { Navigate, Route, Routes } from "react-router-dom";
import Newform from "../../Containers/Newform/Newform";
import Dashboard from "../../Containers/Dashboard/Dashboard";
import NotFound from "../404/NotFound";
import Response from "../../Containers/Response/Response";
import EditForm from "../../Containers/EditForm/EditForm";
import "./Home.css";

const Home = () => {
	return (
		<div className="Home">
			<div className="HomeContent">
				<Routes>
					<Route path="/" element={<Navigate to="/user/dashboard" />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/newform" element={<Newform />} />
					<Route path="/form/checkresponse/:id" element={<Response />} />
					<Route path="/form/edit/:id" element={<EditForm />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</div>
	);
};

export default Home;
