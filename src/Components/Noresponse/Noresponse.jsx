import React from 'react'
import image1 from "../../images/noresponse.png"
import "./Noresponse.css"
const Noresponse = () => {
  return (
    <div>
      <img className="image1" src={image1}></img>
      <p>Seems like you haven't got any responses yet ;( you can wait or <a className='link' href="">share this form</a></p>

    </div>
  )
}

export default Noresponse
