import React from "react";
import avatar from "../../images/avatar 1.png";
import { useAuth } from "../../context/AuthContext";
import background from "../../images/authImg.png";
import "./Myforms.css";
import line2 from "../../images/Line 2.png";
import line1 from "../../images/Line1.png";
import dash1 from "../../images/dash1.png";
import dash2 from "../../images/dash2.png";
import editprofile from "../../images/profile edit button.png";
import Card from "../Card/Card";
import { signOut } from "@firebase/auth";
import { auth } from "../../Firebase";
import { toast } from "react-hot-toast";

function Myforms() {
	const { currentUser } = useAuth();
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

	return (
		<div
			className="background"
			style={{
				backgroundImage: `url(${background})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				backgroundPosition: "center",
				height: "100vh",
				width: "100vw",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div
				className="main"
				style={{
					background: "white",
					height: "90vh",
					width: "90vw",
					borderRadius: "20px",
					padding: "2rem",
				}}
			>
				<div className="leftcol">
					<img src={dash1} alt="dash" className="dash1" />
					<p className="myform">My Forms</p>
					<img src={line2} className="line2" alt="misc"></img>

					<Card></Card>
					<Card></Card>
					<Card></Card>
					<Card></Card>

					<button className="createbutton">Create</button>
				</div>

				<img className="line1" src={line1} alt="misc"></img>

				<div className="rightcol">
					<img src={dash2} alt="dash" className="dash2" />
					<div className="profile">
						<p className="myprofile">
							<center>My Profile</center>
						</p>
						<br></br>
						<div className="avatar">
							<img src={avatar} alt="user profile"></img>
							<button className="editprofilebutton">
								<img src={editprofile} alt="edit profile"></img>
							</button>
						</div>
					</div>
					<div className="profilecontent">
						<p>Username-{currentUser.displayName}</p>
						<br />
						<p>User Id- {currentUser.uid}</p>
						<br />
						<p>Email-{currentUser.email}</p>
					</div>
					<br />
					<div className="lobutton">
						<button className="logoutbutton" onClick={() => logOut()}>
							Log Out
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Myforms;
