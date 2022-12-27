import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import eyeclose from "../../images/eye-close.png";
import eyeopen from "../../images/eye-open.png";
import google from "../../images/google.png";
import facebook from "../../images/Facebook.png";
import { useAuth } from "../../context/AuthContext";
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import toast from "react-hot-toast";

function Login() {
	const { login } = useAuth();
	const [values, setValues] = useState({
		email: "",
		password: "",
	});
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

	const handleSubmission = async (e) => {
		e.preventDefault();
		if (!values.email || !values.password) {
			toast.error("Please fill all the feilds !");
			return;
		}
		setSubmitButtonDisabled(true);
		toast.promise(
			login(values.email, values.password),
			{
				loading: "Logging in....",
				success: "Logged in!",
				error: (err) => {
					handleError(err);
				},
			},
			{
				error: {
					duration: 1,
				},
			}
		);
		const handleError = (err) => {
			setSubmitButtonDisabled(false);
			if (err.message === "Firebase: Error (auth/wrong-password).") {
				toast.error("wrong credentials !");
			} else if (err.message === "Firebase: Error (auth/user-not-found).") {
				toast.error("User does not exists !");
			} else {
				toast.error("Error logging in ! Try again later");
			}
		};
	};

	const [state, setstate] = useState(false);
	const toggleBtn = () => {
		setstate((prevState) => !prevState);
	};
	return (
		<div className="login">
			<div className="leftside"></div>
			<div className="rightside">
				<div className="child">
					<h2 className="heading">Sign in</h2>
					<p className="noaccount">Don't have an account yet?</p>
					<Link className="registerbtn" to="/signup">
						Register Here !
					</Link>
					<div className="loginbox">
						<label className="emailheading" htmlFor="email">
							Email
						</label>
						<div className="emailHolder">
							<IoMdMail className="login-email" />
							<input
								className="emailarea"
								type="email"
								placeholder="Enter your Email address"
								name="email"
								onChange={(event) =>
									setValues((prev) => ({ ...prev, email: event.target.value }))
								}
								required
							/>
						</div>
						<label className="passwordheading" htmlFor="password">
							Password
						</label>
						<div className="passwordHolder">
							<FaLock className="login-password" />
							<input
								className="passwordarea"
								type={state ? "text" : "password"}
								placeholder="Enter your password "
								name="password"
								onChange={(event) =>
									setValues((prev) => ({
										...prev,
										password: event.target.value,
									}))
								}
								required
							/>

							<div className="eyeclose" onClick={toggleBtn}>
								{state ? (
									<img src={eyeopen} alt="" className="eyeclose1"></img>
								) : (
									<img src={eyeclose} alt="" className="eyeclose1"></img>
								)}
							</div>
						</div>
					</div>
					<div className="extraDetails">
						<div className="rememberMecheck">
							<input
								type="checkbox"
								id="rememberMe"
								name="rememberMe"
								value="rememberMe"
							/>
							<label htmlFor="rememberMe"> Remember Me</label>
						</div>
						<Link className="forgotPassword" to="/resetpass">
							forgot password?
						</Link>
						{/* <a className='forgotPassword' href="#/">forgot password?</a> */}
					</div>
					<button
						className="loginbtn"
						disabled={submitButtonDisabled}
						onClick={handleSubmission}
					>
						Login
					</button>
					<div className="otheroption">
						<p>or continue with</p>
						<div className="otheroptionimg">
							<img
								src={google}
								alt=""
								onClick={() => {
									toast("Google authentication coming soon...");
								}}
							/>
							<img
								src={facebook}
								alt=""
								onClick={() => {
									toast("Facebook authentication coming soon...");
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
