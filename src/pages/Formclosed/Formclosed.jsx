import sadsticker from "../../images/sadsticker.png";
import React from "react";
import "./Formclosed.css";

const Formclosed = ({ title }) => {
	return (
		<div className="submittedPage">
			<div className="submittedContent">
				<u className="underline">
					<p className="formname">{title}</p>
				</u>
				<img className="clap" src={sadsticker} alt="not available"></img>
				<p className="thankyou">AW SNAP!</p>
				<p className="ressub">
					Looks like the form you are trying to access is{" "}
					<span style={{ fontWeight: "600" }}>
						no longer accepting responses.
					</span>
					<br />
					<span
						style={{ fontSize: "0.8rem", marginTop: "0.5rem", color: "grey" }}
					>
						If you think this is an error plese contact form owner
					</span>
				</p>
			</div>
		</div>
	);
};

export default Formclosed;
