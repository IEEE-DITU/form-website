import React from 'react';
import { Link } from 'react-router-dom';
import "./Card.css";
import { cards1 } from '../Constants/dummydata';

function Card(){
    return(
        <div>
        {cards1.map((e,id)=>{return(<div key={id}>
    <div className='card'>
        <div className='cardleft'>
            <p className='cardcontent'>Form Tittle - {e.FormTittle}</p>
            <p className='cardcontent'>Form Creation Date - {e.FormCreationDate}</p>
            <p className='cardcontent'>Number of responces - {e.Numberofresponces}</p>

        </div>
        <div className='cardright'>
            <button className='openclose'>open</button>
            <Link className="viewresponse" >view responses</Link>
        </div>        
    </div>
</div>)})}
        </div>

    )
}
export default  Card;
