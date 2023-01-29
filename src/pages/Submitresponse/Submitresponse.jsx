import hands1 from "../../images/clap.png";
import React from "react";
// import {
// 	doc,
//     getDoc,

// } from "firebase/firestore";
// import { db } from "../../Firebase";
// import { ref } from "firebase/storage";
import "./Submitresponse.css";

const Submitresponse = () => {
	//    const promise = () => {
	// 		return new Promise((resolve, reject) => {
	// 			const ref = doc(db, "forms", e.id);
	// 			getDoc(ref)
	// 				.then(() => resolve())
	// 				.catch((err) => {
	// 					reject(err);
	// 				});
	// 		});
	// 	};
	return (
		<div className="submittedPage">
			<div className="submittedContent">
				<u className="underline">
					<p className="formname">Form name</p>
				</u>
				<img className="clap" src={hands1} alt="not available"></img>
				<p className="thankyou">THANK YOU</p>
				<p className="ressub">Your response has been submitted.</p>
				<p className="links">*links and some other stuff</p>
			</div>
		</div>
	);
};

export default Submitresponse;
