import sadsticker from "../../images/sadsticker.png"
import React from 'react';
import bgimage3 from "../../images/bgimage3.png";
import "./Formclosed.css";


const Formclosed = () => {
    
return (
  
    <div classname="mainb" style={{backgroundImage:`url(${bgimage3})`,width:'100%',height:'100vh'}}>
        <div className='maindiv'>
            <div className="contentdiv">
            <u className='underline'><p className="formname">Form name</p></u>
            <img className="clap" src ={sadsticker} alt="image not available" ></img>
            <p className="thankyou">AW SNAP!</p>
            <p className="ressub">Looks like the form you are trying to access is no longer accepting responses.</p>
            <p className="links">*links and some other stuff</p>

            </div>
            
        </div>
    </div>
  )
}

export default Formclosed;
