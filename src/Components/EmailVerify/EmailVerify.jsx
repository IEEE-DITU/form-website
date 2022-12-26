import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import "./EmailVerify.css";

function EmailVerify() {
	const { currentUser } = useAuth();
	return (
		<div className="EmailVerify">
			{currentUser &&
				!currentUser.verified &&
				"verfiy your mail to continue . link has been sent to your mail. If your created your accout before 26/12/2022 then recreate with other email id to recieve verification mail."}
		</div>
	);
}

export default EmailVerify;
