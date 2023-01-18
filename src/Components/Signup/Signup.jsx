import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { IoMdMail } from "react-icons/io";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import toast from "react-hot-toast";
import eyeclose from "../../images/eye-close.png";
import eyeopen from "../../images/eye-open.png";
import "./Signup.css";

function Signup({ setLogin }) {
	const { signup, verifyUser } = useAuth();
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
		const promise = () => {
			return new Promise((resolve, reject) => {
				try {
					signup(values.email, values.password)
						.then((data) => {
							const user = data.user;
							updateProfile(user, {
								displayName: values.username,
							});
							setDoc(doc(db, "users", data.user.uid), {
								name: values.username,
								email: values.email,
								uid: data.user.uid,
								forms: [],
								profileImg:"https://firebasestorage.googleapis.com/v0/b/ieee-custom-forms-181e4.appspot.com/o/Profile_Image%2Fprofile_2.png?alt=media&token=f0579c59-4506-4201-976b-4df2c4604e50"
							})
								.then(() => verifyUser())
								.then(() => setSubmitButtonDisabled(false));
						})

						.then(() => resolve())
						.catch((err) => {
							reject(err);
						});
				} catch (err) {
					reject(err);
				}
			});
		};

		setSubmitButtonDisabled(true);
		toast.promise(promise(), {
			loading: "Signing up...",
			success: () => {
				return "Signed up!";
			},
			error: (err) => {
				setSubmitButtonDisabled(false);
				return `${err.code.split("/")[1]}`;
			},
		});
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
		<div className="SignUp">
			<h2 className="heading">Sign up</h2>
			<p className="haveaccount">Already have an account with us?</p>
			<div className="loginlink" onClick={() => setLogin(true)}>
				Login Here !
			</div>
			<div className="signupbox">
				<label className="emailheading" htmlFor="email">
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

				<label className="userheading" htmlFor="user">
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

				<label className="passwordheading" htmlFor="password">
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
				<label className="cfmpasswordheading" htmlFor="cfmpassword">
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
	);
}

export default Signup;
