import React, { useState } from 'react'
import authImg from '../../images/authImg.png'
import './Signup.css'
import { Link ,useNavigate} from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { auth } from '../../Firebase';


function Signup() {
  const navigate=useNavigate();
  const [values,setValues]=useState({
    email:"",
    username:"",
    password:"",
    cfmpassword:""
  });

  const [message,setMessage]=useState("");
  const [submitButtonDisabled,setSubmitButtonDisabled]=useState(false);

  const handleSubmission=()=>{
    if(!values.email||!values.username||!values.password||!values.cfmpassword){
      setMessage("Please fill all the feilds !")
      return;
    }
    if(values.password!==values.cfmpassword){
      setMessage("Please Enter same password !")
      return;
    }
    setMessage("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth,values.email,values.password)
    .then(async(res)=>{
      setSubmitButtonDisabled(false);
      const user=res.user;
      await updateProfile(user,{
        displayName:values.username
      });
      navigate('/login')
    })
    .catch((err)=>{
      setSubmitButtonDisabled(false);
      setMessage(err.message);
    })
  }
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
          <input className="emailarea" type="email" placeholder="&#xf0e0;   Enter your Email address" style={{ fontFamily: "Arial, FontAwesome" }} name="email" onChange={(event)=>
            setValues((prev)=>({...prev,email:event.target.value}))} required />

          <label className="userheading" for="user">Username</label>

          <input className="userarea" type="text" placeholder="&#xf007;   Enter your Username" style={{ fontFamily: "Arial, FontAwesome" }} name="user" onChange={(event)=>
            setValues((prev)=>({...prev,username:event.target.value}))} required />

          <label className="passwordheading" for="password">Password</label>

          <input className="passwordarea" type="password" placeholder="&#xf023;   Enter your password" style={{ fontFamily: "Arial, FontAwesome" }} name="password" onChange={(event)=>
            setValues((prev)=>({...prev,password:event.target.value}))} required />

          <label className="cfmpasswordheading" for="cfmpassword">Confirm Password</label>

          <input className="cfmpasswordarea" type="password" placeholder="&#xf023;   Enter your password" style={{ fontFamily: "Arial, FontAwesome" }} name="cfmpassword" onChange={(event)=>
            setValues((prev)=>({...prev, cfmpassword:event.target.value}))} required />
        </div>
        <b className='errormsg'>{message}</b>
        <button className="registerbtn" disabled={submitButtonDisabled} onClick={handleSubmission}>Register</button>
      </div>
    </div>
  )
}

export default Signup;
