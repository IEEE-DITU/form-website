import { sendPasswordResetEmail,signOut } from '@firebase/auth';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { auth } from '../../Firebase';
import './PasswordReset.css'

function PasswordReset() {
    const navigate=useNavigate();
    const [values, setValues] = useState({
        email: ""
    });
    const [message, setMessage] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmission=()=>{
        if(!values.email)
        {
            setMessage("Please fill the field !");
            return;
        }
        setMessage("");
        setSubmitButtonDisabled(true);
        sendPasswordResetEmail(auth,values.email)
        .then(()=>{
            setSubmitButtonDisabled(false);
            toast.error("verification link send !\nRedirecting for Login...");
            setTimeout(()=>{
                signOut(auth).then(() => {
                    navigate('/login');
                  }).catch((error) => {
                    console.log("error:",error)
                  });
            },2000)
        })
        .catch((err)=>{
            setSubmitButtonDisabled(false);
            if(err.message==="Firebase: Error (auth/user-not-found).")
            {
                toast.error("User not registered !\nRedirecting to signup...");
                setTimeout(()=>{
                    navigate('/signup');
                },2000)
            }
            else{
                toast.error(err.message);
            }
        })
    }

    return (
        <div id="card">
            <div id="card-content">
                <div id="card-title">
                    <h2>Password Reset</h2>
                    <div className="underline-title"></div>
                </div>
                <form method="post" className="form">
                    <label htmlFor="user-email" style={{ paddingTop: "13px" }}>
                        &nbsp;Email
                    </label>
                    <input id="user-email" className="form-content" placeholder="&#xf0e0;   Enter your Email address" style={{ fontFamily: "Arial, FontAwesome" }} type="email" name="email" onChange={(event) =>
                        setValues((prev) => ({ ...prev, email: event.target.value }))} required />
                    <div className="form-border"></div>
                    <b className='errormsg'>{message}</b>
                    <input id="submit-btn" disabled={submitButtonDisabled} type="submit" name="submit" onClick={handleSubmission} value="RESET" />
                </form>
            </div>
        </div>
    )
}

export default PasswordReset
