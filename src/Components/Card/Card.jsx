import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import Togglebutton from "../Togglebutton/Togglebutton";

function Card(e) {
	const [state, setstate] = useState(false);
	const toggleBtn = () => {
		setstate((prevState) => !prevState);
	};
	
	return (
		<div className="card">
			<div className="cardleft">
				<p className="cardcontent">
					<b>Form Tittle</b> - {e.title}
				</p>
				<p className="cardcontent">
					<b>Form Creation Date</b> - {e.createdAt}
				</p>
				<p className="cardcontent">
					<b>Number of responces</b> - {"in dvlpmnt..."}
				</p>
			</div>
			<div className="cardright" >
				<Togglebutton/>
				<Link className="viewresponse">view responses</Link>
			</div>
		</div>
	);
}
export default Card;
