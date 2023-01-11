import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "@firebase/auth";
import { auth } from "../../Firebase";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";
import { toast } from "react-hot-toast";
import { Tabs } from "@mantine/core";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import avatar from "../../images/avatar 1.png";
import line1 from "../../images/Line1.png";
import dashboardBgImage1 from "../../images/dash1.png";
import dashboardBgImage2 from "../../images/dash2.png";
import editprofile from "../../images/profile edit button.png";
import Pagination from "../../Components/Pagination/Pagination";

import "./Dashboard.css";
import MyForms from "../../Components/MyForms/MyForms";

function Dashboard() {
	const { currentUser } = useAuth();

	const [forms, setForms] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState(false);
	// eslint-disable-next-line
	const [postsPerPage, setPostsPerPage] = useState(3);
	const indexOfLastCard = currentPage * postsPerPage;
	const indexOfFirstCard = indexOfLastCard - postsPerPage;
	const currentPosts = forms.slice(indexOfFirstCard, indexOfLastCard);

	useEffect(() => {
		function fetchUserForms() {
			const q = query(
				collection(db, "forms"),
				where("creatorId", "==", currentUser.uid)
			);
			onSnapshot(q, (querySnapshot) => {
				const forms = [];
				querySnapshot.forEach((doc) => {
					forms.push(doc.data());
				});

				forms.sort(function (a, b) {
					return new Date(b.createdAt) - new Date(a.createdAt);
				});
				setForms([...forms]);
				setLoading(false);
			});
		}
		return fetchUserForms();
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
		<>
			<div className="sideButtonsDashboard">
				<div
					className={`sideButtonDashboard ${profile ? "" : "active"}`}
					onClick={() => setProfile(false)}
				>
					<BiHomeAlt />
					<p>Home</p>
				</div>
				<div
					className={`sideButtonDashboard ${profile ? "active" : ""}`}
					onClick={() => setProfile(true)}
				>
					<AiOutlineUser />
					<p>Profile</p>
				</div>
			</div>
			<div className="Dashboard">
				<div className={`DashboardLeft ${profile ? "dNone" : ""}`}>
					<img src={dashboardBgImage1} alt="dash" className="Dashboardbg1" />
					<div className="DashboardLeftTop">
						<div className="heading">
							<p>My Forms</p>
						</div>
						<Link to={"/user/newform"} style={{ zIndex: 10 }}>
							<div className="DashboardCreateButton">+ Create</div>
						</Link>
					</div>

					<div
						style={{
							width: "100%",
							overflow: "scroll",
							height: "100%",
							paddingTop: "0.75rem",
						}}
					>
						<Tabs
							color="red"
							variant="outline"
							radius="md"
							defaultValue="myforms"
						>
							<Tabs.List grow position="center">
								<Tabs.Tab value="myforms">MyForms</Tabs.Tab>
								<Tabs.Tab value="shared">Shared with me</Tabs.Tab>
							</Tabs.List>

							<Tabs.Panel value="myforms" pt="xs">
								<MyForms currentPosts={currentPosts} loading={loading} />
							</Tabs.Panel>

							<Tabs.Panel value="shared" pt="xs">
								{loading && (
									<div>
										<b>Loading...</b>
									</div>
								)}
								This feature is under development
							</Tabs.Panel>
						</Tabs>
					</div>

					<Pagination
						totalPosts={forms.length}
						postsPerPage={postsPerPage}
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
					/>
				</div>
				<img className="line1" src={line1} alt="misc"></img>
				<div className={`DashboardRight ${profile ? "" : "dNone"}`}>
					<img src={dashboardBgImage2} alt="dash" className="Dashboardbg2" />
					<p className="myprofile">My Profile</p>
					<div className="avatar">
						<img src={avatar} alt="user profile"></img>
						<img src={editprofile} alt="edit profile"></img>
					</div>
					<div className="profilecontent">
						<p>Name- {currentUser.displayName}</p>
						<p>Email- {currentUser.email}</p>
					</div>
					<button className="DashboardLogout" onClick={() => logOut()}>
						Log Out
					</button>
				</div>
			</div>
		</>
	);
}

export default Dashboard;
