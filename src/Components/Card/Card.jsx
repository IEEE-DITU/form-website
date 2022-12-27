import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

function Card(e) {
	return (
		<div className="card">
			<div className="cardleft">
				<p className="cardcontent">Form Tittle - {e.FormTittle}</p>
				<p className="cardcontent">Form Creation Date - {e.FormCreationDate}</p>
				<p className="cardcontent">
					Number of responces - {e.Numberofresponces}
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
