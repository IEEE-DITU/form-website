import sadsticker from "../../images/sadsticker.png";
import React from "react";
import "./Formclosed.css";

const Formclosed = () => {
	return (
		<div className="submittedPage">
			<div className="submittedContent">
				<u className="underline">
					<p className="formname">Form name</p>
				</u>
				<img className="clap" src={sadsticker} alt="image not available"></img>
				<p className="thankyou">AW SNAP!</p>
				<p className="ressub">
					Looks like the form you are trying to access is no longer accepting
					responses.
				</p>
				<p className="links">*links and some other stuff</p>
			</div>
		</div>
	);
};

export default Formclosed;
