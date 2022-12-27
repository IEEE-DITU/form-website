import React, { useState } from "react";
import avatar from "../../images/avatar 1.png";
import { useAuth } from "../../context/AuthContext";
import background from "../../images/bg1.png";
import "./Myforms.css";
import line2 from "../../images/Line 2.png";
import line1 from "../../images/Line1.png";
import editprofile from "../../images/profile edit button.png";
import Card from "../Card/Card";
import { signOut } from "@firebase/auth";
import { auth } from "../../Firebase";
import { toast } from "react-hot-toast";
import { async } from "@firebase/util";
import { cards1 } from "../Constants/dummydata";

function Myforms() {
    const [coinsData,setCoinsData]=useState([]);
    const [currentPage ,setCurrentPage]=useState(1);
    const [postsPerPage,setPostsPerPage]=useState(5);

    

    const indexOfLastCard = currentPage * postsPerPage;
    const indexOfFirstCard = indexOfLastCard - postsPerPage;
    const currentPosts=coinsData.slice(indexOfFirstCard,indexOfLastCard);

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
				backgroundSize: "contain",
			}}
		>
			<div className="main">
				<div className="leftcol">
					<p className="myform">My Forms</p>
					<img src={line2} className="line2"></img>

					<Card coinsData={currentPosts}/>
					<button className="createbutton">Create</button>
				</div>

				<img className="line1" src={line1}></img>

				<div className="rightcol">
					<div className="profile">
						<p className="myprofile">
							<center>My Profile</center>
						</p>
						<br></br>
						<div className="avatar">
							<img src={avatar}></img>
							<button className="editprofilebutton">
								<img src={editprofile}></img>
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
