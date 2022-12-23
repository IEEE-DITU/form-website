
import React, { useState } from 'react'
import authImg from '../../images/authImg.png'
import './Login.css'
import { Link } from 'react-router-dom'
import eyeclose from "../../images/eye-close.png"
import eyeopen from "../../images/eye-open.png"
import google from '../../images/google.png';
import facebook from '../../images/Facebook.png';

function Login() {
    const[state , setstate] = useState(false);
  const toggleBtn = () =>{
    setstate(prevState => !prevState);
  }
  return (
    <div className='login'>
      <div>
        <img className='authImg' src={authImg} alt="" />
      </div>
      <div className='rightside'>
        <h2 className='heading'>Sign in</h2>
        <p className='noaccount'>Don't have an account yet?</p>
        <Link className="registerbtn" to="/signup">Register Here !</Link>
        <div className="loginbox">
          <label className="emailheading" for="email">Email</label>
          <input className="emailarea" type="email" placeholder="&#xf0e0;   Enter your Email address" style={{ fontFamily: "Arial, FontAwesome" }} name="email" required />
          <label className="passwordheading" for="password">Password</label>
          <div class="pass">
            <input className="passwordarea" type={state ? "text": "password"} placeholder="&#xf023;   Enter your password " style={{ fontFamily: "Arial, FontAwesome" }} name="password" required />
            <button className='eyeclose' onClick={toggleBtn}>
              {state ? <img src={eyeopen} className="eyeclose1"></img> : <img src={eyeclose} className="eyeclose1"></img>}
            </button> 
          </div>
        </div>
        <div className="extraDetails">
          <div className="rememberMecheck">

            <input type="checkbox" id="rememberMe" name="rememberMe" value="rememberMe" />
            <label for="rememberMe"> Remember Me</label>
          </div>
          <a className='forgotPassword' href="#/">forgot password?</a>
        </div>
        <button className="loginbtn">Login</button>
        <div className="otheroption">
          <p>or continue with</p>
          <div className="otheroptionimg">
            <a href="#/"><img src={google} alt="" /></a>
            <a href="#/"><img src={facebook} alt="" /></a>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login
