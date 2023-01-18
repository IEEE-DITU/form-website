import React from "react";
import "./Verify.css";
import msgImg from "../../images/message2.png";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "@firebase/auth";
import { auth } from "../../Firebase";
import { toast } from "react-hot-toast";

function Verify() {
	const { currentUser, verifyUser } = useAuth();
	const compEmail = currentUser.email;
	const partialEmail = compEmail.replace(
		/(\w{3})[\w.-]+@([\w.]+\w)/,
		"$1***@$2"
	);
	const logOut = () => {
		toast.promise(
			signOut(auth).catch((error) => {
				toast.error("Error logging out");
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
		<div>
			<div className="msgImg">
				<img src={msgImg} alt="" />
			</div>
			<div className="heading">Verify your Email</div>
			<div className="para">
				<p>Almost there! We’ve sent a verification email to {partialEmail}</p>
				<p>
					Click on the verification link provided in the email and refresh the
					page.
				</p>
			</div>
			<div className="buttons">
				<button className="resend" onClick={() => verifyMail()}>
					Resend Verification Mail
				</button>
				<button className="logout" onClick={() => logOut()}>
					Logout
				</button>
				<button
					className="refresh"
					onClick={() => window.location.reload(false)}
				>
					Refresh
				</button>
			</div>
		</div>
	);
}

export default Verify;
