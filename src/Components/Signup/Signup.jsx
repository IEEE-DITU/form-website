import React from 'react'
import authImg from '../../images/authImg.png'
import './Signup.css'
import { Link } from 'react-router-dom'


function Signup() {
  return (
    <div className='signup'>
      <div>
        <img className='authImg' src={authImg} alt="" />
      </div>
      <div className='rightside'>
        <h2 className='heading'>Sign up</h2>
        <p className='haveaccount'>Already have an account with us?</p>
        <Link className="loginlink" to="/login">Login Here !</Link>
        <div className="signupbox">
          <label className="emailheading" for="email">Email</label>
          <input className="emailarea" type="email" placeholder="&#xf0e0;   Enter your Email address" style={{ fontFamily: "Arial, FontAwesome" }} name="email" required />
          <label className="userheading" for="user">Username</label>
          <input className="userarea" type="text" placeholder="&#xf007;   Enter your Username" style={{ fontFamily: "Arial, FontAwesome" }} name="user" required />
          <label className="passwordheading" for="password">Password</label>
          <input className="passwordarea" type="password" placeholder="&#xf023;   Enter your password" style={{ fontFamily: "Arial, FontAwesome" }} name="password" required />
          <label className="cfmpasswordheading" for="cfmpassword">Confirm Password</label>
          <input className="cfmpasswordarea" type="password" placeholder="&#xf023;   Enter your password" style={{ fontFamily: "Arial, FontAwesome" }} name="cfmpassword" required />
        </div>
        <button className="registerbtn">Register</button>
      </div>
    </div>
  )
}

export default Signup;
