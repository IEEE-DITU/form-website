import { useParams } from "react-router-dom";
import "./Response.css";

const Response = () => {
	const { id } = useParams();
	return (
		<div>
			<div>{id}</div>
		</div>
	);
};

export default Response;
