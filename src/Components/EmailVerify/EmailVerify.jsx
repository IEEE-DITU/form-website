import React from "react";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "@firebase/auth";
import { auth } from "../../Firebase";
import { toast } from "react-hot-toast";
import "./EmailVerify.css";

function EmailVerify() {
	const { currentUser, verifyUser } = useAuth();
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
		<div className="EmailVerify">
			<div className="box">
				{currentUser &&
					!currentUser.verified &&
					"To continue verify your email. Check your spam folder if you did not recieved verification link"}
				<button onClick={() => verifyMail()}>Resend verification link</button>
				<button onClick={() => logOut()}>Logout</button>
			</div>
		</div>
	);
}

export default EmailVerify;
