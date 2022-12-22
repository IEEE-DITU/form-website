import React from 'react'
import authImg from '../../images/authImg.png'
import './Login.css'
import { Link } from 'react-router-dom'
import google from '../../images/google.png';
import apple from '../../images/apple.png';
import facebook from '../../images/Facebook.png';

function Login() {
  return (
    <div className='login'>
      <div>
        <img className='authImg' src={authImg} alt="" />
      </div>
      <div className='rightside'>
        <h2 className='heading'>Sign in</h2>
        <p className='noaccount'>Don't have an account yet?</p>
        {/* <button>Register Here !</button> */}
        <Link className="registerbtn" to="/signup">Register Here !</Link>
        <div className="loginbox">
          <label className="emailheading" for="email">Email</label>
          <input className="emailarea" type="email" placeholder="&#xf0e0;   Enter your Email address" style={{ fontFamily: "Arial, FontAwesome" }} name="email" required />
          <label className="passwordheading" for="password">Password</label>
          <input className="passwordarea" type="password" placeholder="&#xf023;   Enter your password" style={{ fontFamily: "Arial, FontAwesome" }} name="email" required />
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
            <a href="#/"><img src={apple} alt="" /></a>
            <a href="#/"><img src={facebook} alt="" /></a>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login
