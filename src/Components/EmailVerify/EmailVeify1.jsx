import React from 'react'
import './EmailVeify1.css'
import msgImg from '../../images/message2.png'
// import hand1 from '../../images/hand1.png'
// import hand2 from '../../images/hand2.png'
import { useAuth } from '../../context/AuthContext'
import { signOut } from "@firebase/auth";
import { auth } from "../../Firebase";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router';

function EmailVeify1() {
    const navigate=useNavigate();
    const { currentUser, verifyUser } = useAuth();
    const compEmail = currentUser.email;
    const partialEmail = compEmail.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1***@$2");
    const logOut = () => {
		toast.promise(
			signOut(auth).catch((error) => {
				console.log(toast.error("Error logging out"));
				console.log(error);
			}),
			{
				loading: "Logging out....",
				success: "Logged out!",
				error: "Error logging out",
			}
		);
	};
    const verifyMail = () => {
		toast.promise(verifyUser(), {
			loading: "Sending verification link...",
			success: "Link Sent!",
			error: (err) => `${err.code.split("/")[1]}`,
		});
	};
    return (
        <div className='emailVerification1'>
                <div className="card">
                    <div className="msgImg">
                        <img src={msgImg} alt="" />
                    </div>
                    {/* <div className="hand1">
                    <img src={hand1} alt="" />
                    <div className="heading">
                        <div>Verify your Email</div>
                    </div>
                    <div className="hand2">
                        <img className='hand2' src={hand2} alt="" />
                    </div>
                </div> */}
                    <div className="heading">
                        <div>Verify your Email</div>
                    </div>
                    <div className="para">
                        <div>Almost there! We’ve sent a verification email to {partialEmail}.</div>
                        <div>Click on the verification link provided in the email and login again</div>
                    </div>
                    <div className="buttons">
                        <button className="resend" onClick={() => verifyMail()}>Resend Verification Mail</button>
                        <button className="logout" onClick={() => logOut()}>Logout</button>
                        <button className="refresh" onClick={() => window.location.reload(false)}>Refresh</button>
                    </div>
                </div>
        </div>
    )
}

export default EmailVeify1