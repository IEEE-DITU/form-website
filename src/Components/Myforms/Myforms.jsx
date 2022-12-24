import React from 'react';
import { Link } from 'react-router-dom';
import bigphone from "../../images/Allura Giant Phone.png";
import avatar from "../../images/avatar 1.png";
import brazuka from "../../images/Brazuca Planning.png";
import formbg from "../../images/pagebg.png";
import background from "../../images/bg1.png"
import "./Myforms.css"
import line2 from "../../images/Line 2.png";
import line1 from "../../images/Line1.png"
import editprofile from  "../../images/profile edit button.png";
import Card from '../Card/Card';
function Myforms(){
    
    return(
        
    <div className='background' style={{ backgroundImage:`url(${background})`,backgroundRepeat:"no-repeat",backgroundSize:"contain" }}>
        <div className='main'>
            <div className='leftcol'>
                <p className='myform'>My Forms</p>
                <img src={line2} className='line2'></img>
                
                <Card></Card>
                <Card></Card>
                <Card></Card>
                
                <button className='createbutton' >Create</button>
                

            </div>
    
            <img className='line1' src={line1}></img>
            
            <div className='rightcol'>
               <div className='profile'>
                    <p className='myprofile'><center>My Profile</center></p>
                    <div className='avatar'>
                    <img src={avatar}></img>
                    </div>
               </div>
               <div className='profilecontent'>
                <p>Name - Shreyal Jain</p>
                <p>User Id- Shreyal1605</p>
                <p>Email- shreyaljain0007@gmail.com</p>
               </div>   
               <div className='lobutton'>
                 <button className='logoutbutton' >Log Out</button>
               </div> 
               
                
                


            </div>
        </div>
    </div>
       

        
 
    )

}
export default Myforms;
 