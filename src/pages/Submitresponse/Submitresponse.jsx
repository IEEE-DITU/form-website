import hands1 from "../../images/clap.png"
import React from 'react';
import bgimage3 from "../../images/bgimage3.png";
import "./Submitresponse.css"
import {
	doc,
    getDoc,
	
} from "firebase/firestore";
import { db } from "../../Firebase";
import { ref } from "firebase/storage";

const Submitresponse = (e) => {
   const promise = () => {
		return new Promise((resolve, reject) => {
			const ref = doc(db, "forms", e.id);
			getDoc(ref)
				.then(() => resolve())
				.catch((err) => {
					reject(err);
				});
		});
	};
    
return (
  
    <div classname="mainb" style={{backgroundImage:`url(${bgimage3})`,width:'100%',height:'100vh'}}>
        <div className='maindiv'>
            <div className="contentdiv">
            <u className='underline'><p className="formname">{ref.title}</p></u>
            <img className="clap" src ={hands1} alt="image not available" ></img>
            <p className="thankyou">THANK YOU</p>
            <p className="ressub">Your response has been submitted.</p>
            <p className="links">*links and some other stuff</p>

            </div>
            
        </div>
    </div>
  )
}

export default Submitresponse;
