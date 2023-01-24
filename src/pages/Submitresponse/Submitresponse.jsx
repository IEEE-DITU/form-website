import hands1 from "../../images/clap.png"
import React from 'react';
import bgimage3 from "../../images/bgimage3.png";
import "./Submitresponse.css"
import {
	doc,
	
} from "firebase/firestore";
import { db } from "../../Firebase";

const Submitresponse = () => {
    
return (
  
    <div classname="mainb" style={{backgroundImage:`url(${bgimage3})`,width:'100%',height:'100vh'}}>
        <div className='maindiv'>
            <div className="contentdiv">
            <u className='underline'><p className="formname">Form name</p></u>
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
