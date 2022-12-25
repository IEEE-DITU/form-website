import React from 'react';
import { Link } from 'react-router-dom';
import "./Card.css"

function Card(){
    return(
    <div className='card'>
        <div className='cardleft'>
            <p className='cardcontent'>Form Tittle - Registration Form</p>
            <p className='cardcontent'>Form Creation Date - 29/06/2022</p>
            <p className='cardcontent'>Number of responces - 69</p>

        </div>
        <div className='cardright'>
            <button className='openclose'>open</button>
            <Link className="viewresponse" >view responses</Link>
        </div>        
    </div>
    )
}
export default  Card;
