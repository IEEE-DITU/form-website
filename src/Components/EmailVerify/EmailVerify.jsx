import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import "./EmailVerify.css";

function EmailVerify() {
	const { currentUser } = useAuth();
	const navigate = useNavigate();
	console.log(currentUser);
	return (
		<div>
			{currentUser && !currentUser.verified && "this is verification page"}
		</div>
	);
}

export default EmailVerify;
