import "./Authentication.css";
import Login from "../../Components/Login/Login";
import Signup from "../../Components/Signup/Signup";
import { useState } from "react";

const Authentication = () => {
	const [login, setLogin] = useState(true);
	return (
		<div className="Authentication">
			<div className="AuthLeft"></div>
			<div className="AuthRight">
				<div className="AuthChilds">
					{login ? (
						<Login setLogin={setLogin} />
					) : (
						<Signup setLogin={setLogin} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Authentication;
