import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

function Card(e) {
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
			<div className="cardright">
				<div className="openclose">open</div>
				<Link className="viewresponse">view responses</Link>
			</div>
		</div>
	);
}
export default Card;
