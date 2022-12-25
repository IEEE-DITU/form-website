
import React, { useState } from 'react'
import authImg from '../../images/authImg.png'
import './Login.css'
import { Link,useNavigate } from 'react-router-dom'
import eyeclose from "../../images/eye-close.png"
import eyeopen from "../../images/eye-open.png"
import google from '../../images/google.png';
import facebook from '../../images/Facebook.png';
import { useAuth } from '../../context/AuthContext'

function Login() {
  const {login}=useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = async(e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      setMessage("Please fill all the feilds !")
      return;
    }
    setMessage("");
    
    try {
      setMessage("");
      setSubmitButtonDisabled(true);
      await login(values.email,values.password)
      navigate('/')
    } catch (err) {
      if(err.message==="Firebase: Error (auth/wrong-password).")
        {
          setMessage("wrong credentials !")
        }
        
        else if(err.message==="Firebase: Error (auth/user-not-found)."){
          setMessage("User does not exists !")
        }
        else{
          setMessage("Can't Login ! Try again later");
        }
        setSubmitButtonDisabled(false);
    }
  }

  const [state, setstate] = useState(false);
  const toggleBtn = () => {
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
          <input className="emailarea" type="email" placeholder="&#xf0e0;   Enter your Email address" style={{ fontFamily: "Arial, FontAwesome" }} name="email" onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))} required />
          <label className="passwordheading" for="password">Password</label>
          <div class="pass">
            <input className="passwordarea" type={state ? "text" : "password"} placeholder="&#xf023;   Enter your password " style={{ fontFamily: "Arial, FontAwesome" }} name="password" onChange={(event) =>
              setValues((prev) => ({ ...prev, password: event.target.value }))} required />
            <button className='eyeclose' onClick={toggleBtn}>
              {state ? <img src={eyeopen} alt="" className="eyeclose1"></img> : <img src={eyeclose} alt="" className="eyeclose1"></img>}
            </button>
          </div>
        </div>
        <div className="extraDetails">
          <div className="rememberMecheck">

            <input type="checkbox" id="rememberMe" name="rememberMe" value="rememberMe" />
            <label for="rememberMe"> Remember Me</label>
          </div>
          <Link className="forgotPassword" to="/resetpass">forgot password?</Link>
          {/* <a className='forgotPassword' href="#/">forgot password?</a> */}
        </div>
        <b className='errormsg'>{message}</b>
        <button className="loginbtn" disabled={submitButtonDisabled} onClick={handleSubmission}>Login</button>
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
