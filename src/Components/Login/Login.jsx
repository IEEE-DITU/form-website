import React from 'react'
import authImg from '../../images/authImg.png'
import './Login.css'

function Login() {
  return (
    <div className='login'>
      <img src={authImg} alt="" />
      <h1>Sign in</h1>
    </div>
  )
}

export default Login
