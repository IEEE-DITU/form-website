import React, { useState } from "react";

const Togglebutton = ({
	id,
	acceptingResponses
	
}) =>{
    const [state, setstate] = useState(acceptingResponses);
	const toggleBtn = () => {
		    setstate((prevState) => !prevState);
	};
    
    
    function updateDoc(){
        if("creatorId", "==", id){
        toggleBtn() ;

        }
    }
    return(
        <div>
            <div className="openclose" onClick={toggleBtn}>
					
					{state?<p className="open">{state}</p>:<p className="closed">{state}</p>}
			</div>
        </div>
    )
}
export default Togglebutton;