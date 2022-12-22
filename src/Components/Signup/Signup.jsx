import React from 'react'
import authImg from '../../images/authImg.png'
import './Signup.css'

function Signup() {
  return (
    <div className='signup'>
    <div className="main">
      <div className="left-col">
        <img  src={authImg} ></img>
      </div>
      <div className='right-col'>
        <h1>Sign up</h1>
        <br/>
        <h3>Already has an account with us?</h3><br/>
        <h3>Skip to <a href="../Login">login!</a></h3> <br/>  
      
        <form>
                <div className="form-inner" >
                    <div className='flex flex-col'>
                      <div className="form-group">
                        <label>Email</label>
                        <div className='abc'>
                          <input type="email"  name="email"autoComplete="off" placeholder="Enter your Email address"></input>
                        </div>
                        
                    </div><br/><br/>
                    <div className="form-group">
                        <label>Username</label>
                        <div>
                          <input type="text" name="username"  autoComplete="off" placeholder="Enter your Username"></input>
                        </div>
                        
                    </div><br/><br/>
                    <div className="form-group">
                        <label>Password</label>
                        <div>
                          <input type="password"  name="password" autoComplete="off" placeholder="Enter your Password"></input>
                        </div>
                        
                    </div><br/><br/>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <div>
                           <input type="password"  name="confirm password" autoComplete="off" placeholder="Confirm your Password"></input>
                        </div>
                       
                    </div><br/><br/>
                    <div className="mainbutton">
                        <button className="register-button">Register</button>
                    </div>
                    </div>
                    
                </div>
        </form>
    </div>
    </div>
    </div>
  )
}

export default Signup;
