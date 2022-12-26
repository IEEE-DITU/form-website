import React, { useState } from "react";
import eyeclose from "../../images/eye-close.png";
import eyeopen from "../../images/eye-open.png";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IoMdMail } from "react-icons/io";
import toast from "react-hot-toast";

function Signup() {
	const { signup, verifyUser } = useAuth();
	const navigate = useNavigate();
	const [values, setValues] = useState({
		email: "",
		username: "",
		password: "",
		cfmpassword: "",
	});
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

	const handleSubmission = async (e) => {
		e.preventDefault();
		if (
			!values.email ||
			!values.username ||
			!values.password ||
			!values.cfmpassword
		) {
			toast.error("Please fill all the feilds !");
			return;
		}
		if (values.password !== values.cfmpassword) {
			toast.error("Please Enter same password !");
			return;
		}
		try {
			setSubmitButtonDisabled(true);
			await signup(values.email, values.password);
			await verifyUser();
			navigate("/emailverify");
		} catch (error) {
			if (error.message === "Firebase: Error (auth/email-already-in-use).") {
				toast.error("User Already exists !");
			} else {
				toast.error("Can't Register now !");
			}
		}
	};
	const [state, setstate] = useState(false);
	const [state1, setstate1] = useState(false);
	const toggleBtn = () => {
		setstate((prevState) => !prevState);
	};
	const toggleBtn1 = () => {
		setstate1((prevState) => !prevState);
	};
	return (
		<div className="signup">
			<div className="leftside"></div>
			<div className="rightside">
				<div className="child">
					<h2 className="heading">Sign up</h2>
					<p className="haveaccount">Already have an account with us?</p>
					<Link className="loginlink" to="/login">
						Login Here !
					</Link>
					<div className="signupbox">
						<label className="emailheading" for="email">
							Email
						</label>
						<div className="emailHolder">
							<IoMdMail className="signup-email" />
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

						<label className="userheading" for="user">
							Username
						</label>
						<div className="emailHolder">
							<IoMdMail className="signup-email" />
							<input
								className="userarea"
								type="text"
								placeholder="Enter your Username"
								name="user"
								onChange={(event) =>
									setValues((prev) => ({
										...prev,
										username: event.target.value,
									}))
								}
								required
							/>
						</div>

						<label className="passwordheading" for="password">
							Password
						</label>
						<div className="emailHolder">
							<IoMdMail className="signup-email" />
							<input
								className="passwordarea"
								type={state ? "text" : "password"}
								placeholder="Enter your password"
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
						<label className="cfmpasswordheading" for="cfmpassword">
							Confirm Password
						</label>
						<div className="emailHolder">
							<IoMdMail className="signup-email" />
							<input
								className="cfmpasswordarea"
								type={state1 ? "text" : "password"}
								placeholder="Enter your password"
								name="cfmpassword"
								onChange={(event) =>
									setValues((prev) => ({
										...prev,
										cfmpassword: event.target.value,
									}))
								}
								required
							/>

							<div className="eyeclose" onClick={toggleBtn1}>
								{state1 ? (
									<img src={eyeopen} alt="" className="eyeclose1"></img>
								) : (
									<img src={eyeclose} alt="" className="eyeclose1"></img>
								)}
							</div>
						</div>
					</div>
					<button
						className="registerbtn"
						disabled={submitButtonDisabled}
						onClick={handleSubmission}
					>
						Register
					</button>
				</div>
			</div>
		</div>
	);
}

export default Signup;
