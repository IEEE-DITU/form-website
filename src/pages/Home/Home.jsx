import { signOut } from '@firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router'
import { auth } from '../../Firebase'
import './Home.css'

function Home() {
  const navigate=useNavigate();
  const handleclick=()=>{
      signOut(auth).then(() => {
        navigate('/');
      }).catch((error) => {
        console.log("error:",error)
      });
  }
  return (
    <div className='home'>
      <h1>This is home page</h1>
      <button className="logout" onClick={handleclick}>Logout</button>
    </div>
  )
}

export default Home
