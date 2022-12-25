import { signOut } from '@firebase/auth'
import {React} from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { auth } from '../../Firebase'
import './Home.css'

function Home() {
  // const [message,setMessage]=useState("")
  const {currentUser}=useAuth();
  const navigate=useNavigate();
  const handleclick=()=>{
      signOut(auth).then(() => {
        navigate('/login');
      }).catch((error) => {
        console.log("error:",error)
      });
  }
  return (
    <div className='home'>
      <h1>This is home page</h1> 
      {(!currentUser)?<h3>Kindly <Link className="loginlink" to="/login">Login Here !</Link></h3>:<div className='user'><strong>User:</strong>{currentUser.email}</div>}
      {(currentUser)?<button className="logout" onClick={handleclick}>Logout</button>:""}
    </div>
  )
}

export default Home
