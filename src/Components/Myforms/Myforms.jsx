import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import avatar from "../../images/avatar 1.png";
import { useAuth } from "../../context/AuthContext";
import background from "../../images/authImg.png";
import "./Myforms.css";
import line1 from "../../images/Line1.png";
import dash1 from "../../images/dash1.png";
import dash2 from "../../images/dash2.png";
import editprofile from "../../images/profile edit button.png";
import Card from "../Card/Card";
import { signOut } from "@firebase/auth";
import { auth } from "../../Firebase";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import { db } from "../../Firebase";

function Myforms() {
	const [coinsData, setCoinsData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);
	// eslint-disable-next-line
	const [postsPerPage, setPostsPerPage] = useState(3);

	const indexOfLastCard = currentPage * postsPerPage;
	const indexOfFirstCard = indexOfLastCard - postsPerPage;
	const currentPosts = coinsData.slice(indexOfFirstCard, indexOfLastCard);
	const { currentUser } = useAuth();

	useEffect(() => {
		function fetchUserForms() {
			const q = query(
				collection(db, "forms"),
				where("creatorId", "==", currentUser.uid)
			);

			getDocs(q)
				.then((snapshot) => {
					const forms = [];
					snapshot.forEach((doc) => {
						const data = doc.data();
						forms.push(data);
					});
					setCoinsData([...forms]);
					setLoading(false);
				})
				.catch((error) => {
					console.log(error);
					toast.error("error occured! reload page");
					setLoading(false);
				});
		}
		fetchUserForms();
		// eslint-disable-next-line
	}, []);

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
					background: "#FFF7F2",
					height: "90vh",
					width: "90vw",
					borderRadius: "20px",
					padding: "2rem",
					display: "flex",
					overflow: "hidden",
					gap: "1rem",
				}}
			>
				<div className="leftcol">
					<img src={dash1} alt="dash" className="dash1" />
					<div className="myFormTop">
						<div className="myform">
							<p>My Forms</p>
						</div>
						<Link to={"/newform"} style={{ zIndex: 10 }}>
							<div className="createbutton">+ Create</div>
						</Link>
					</div>

					{loading && (
						<div>
							<b>Loading...</b>
						</div>
					)}
					{!loading &&
						currentPosts.map((e, id) => {
							return <Card key={id} {...e} />;
						})}

					<Pagination
						totalPosts={coinsData.length}
						postsPerPage={postsPerPage}
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
					/>
				</div>
				<img className="line1" src={line1} alt="misc"></img>
				<div className="rightcol">
					<img src={dash2} alt="dash" className="dash2" />
					<p className="myprofile">My Profile</p>
					<div className="avatar">
						<img src={avatar} alt="user profile"></img>
						<img src={editprofile} alt="edit profile"></img>
					</div>
					<div className="profilecontent">
						<p>Name-{currentUser.displayName}</p>
						<p>Email-{currentUser.email}</p>
					</div>
					<button className="logoutbutton" onClick={() => logOut()}>
						Log Out
					</button>
				</div>
			</div>
		</div>
	);
}
export default Myforms;
