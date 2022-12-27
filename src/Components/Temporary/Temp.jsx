import React, { useState } from "react";
import { AiFillDownCircle, AiFillUpCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Temp.css";

const Temp = () => {
	const [down, setdown] = useState(true);
	return (
		<>
			<div className="tempp">
				<AiFillUpCircle
					className="temp-icon2"
					onClick={() => {
						setdown((prev) => !prev);
					}}
				/>
			</div>
			<div className={`temp ${down ? "temp-down" : ""}`}>
				<AiFillDownCircle
					className="temp-icon"
					onClick={() => {
						setdown((prev) => !prev);
					}}
				/>
				<div className="temp-bg">
					<p>temporary just to navigate btw all pages:</p>
					<div className="temp-list">
						<Link to="/">
							<div>/</div>
						</Link>
						<Link to="/login">
							<div>/login</div>
						</Link>
						<Link to="/signup">
							<div>/signup</div>
						</Link>
						<Link to="/resetpass">
							<div>/resetpass</div>
						</Link>
						<Link to="/emailverify">
							<div>/emailverify</div>
						</Link>
						<Link to="/forms/responses">
							<div>/forms/responses</div>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Temp;
