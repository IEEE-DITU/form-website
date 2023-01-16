import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "@firebase/auth";
import { auth } from "../../Firebase";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";
import { toast } from "react-hot-toast";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import avatar from "../../images/no-profile.png";
import line1 from "../../images/Line1.png";
import dashboardBgImage1 from "../../images/dash1.png";
import dashboardBgImage2 from "../../images/dash2.png";
import editprofile from "../../images/profile edit button.png";
import Pagination from "../../Components/Pagination/Pagination";
import MyForms from "../../Components/MyForms/MyForms";
import SharedWithMe from "../../Components/SharedWithMe/SharedWithMe";
import "./Dashboard.css";
import { Modal } from "@mantine/core";
import avatarBoy from '../../images/boy-avatar.png'
import avatarGirl from '../../images/girl-avatar.png'
import { RiH1 } from "react-icons/ri";

function Dashboard() {
	const { currentUser } = useAuth();

	const [forms, setForms] = useState([]);
	const [sharedForms, setSharedForms] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	// eslint-disable-next-line
	const [sharedCurrentPage, setSharedCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [sharedLoading, setSharedLoading] = useState(true);
	const [profile, setProfile] = useState(false);
	// eslint-disable-next-line
	const [postsPerPage, setPostsPerPage] = useState(3);
	const [myform, setMyform] = useState(true);
	const indexOfLastCard = currentPage * postsPerPage;
	const indexOfFirstCard = indexOfLastCard - postsPerPage;
	const currentPosts = forms.slice(indexOfFirstCard, indexOfLastCard);
	const indexOfLastCardShared = sharedCurrentPage * postsPerPage;
	const indexOfFirstCardShared = indexOfLastCardShared - postsPerPage;
	const currentPostsShared = sharedForms.slice(
		indexOfFirstCardShared,
		indexOfLastCardShared
	);
	const [modalOpened, setModalOpened] = useState(false);

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
				fetchSharedForms()
			});
		}
		function fetchSharedForms() {
			const q = query(
				collection(db, "forms"),
				where("collaborators", "array-contains", currentUser.email)
			);
			onSnapshot(q, (querySnapshot) => {
				const forms = [];
				querySnapshot.forEach((doc) => {
					forms.push(doc.data());
				});

				forms.sort(function (a, b) {
					return new Date(b.createdAt) - new Date(a.createdAt);
				});
				setSharedForms([...forms]);
				setSharedLoading(false);
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
			<Modal
				opened={modalOpened}
				onClose={() => setModalOpened(false)}
				title={<h2 className="avatarHeading">Choose the avatar</h2>}>
				

					<div className="avatarsModal">
						<img src={avatarBoy} alt="" />
						<img src={avatarGirl} alt="" />
						{/* <img src={avatar} alt="" /> */}
					</div>

			</Modal>
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

					<div className="formSwitcher">
						<div
							className={`myFormsS ${myform ? "active" : ""}`}
							onClick={() => setMyform(true)}
						>
							<p>My Forms</p>
						</div>
						<div
							className={`sharedWithMes  ${myform ? "" : "active"}`}
							onClick={() => setMyform(false)}
						>
							<p>Shared With Me</p>
						</div>
					</div>

					<div
						style={{
							width: "100%",
							overflow: "scroll",
							height: "100%",
							paddingTop: "0.75rem",
							marginTop: "2px",
						}}
					>
						{myform ? (
							<MyForms currentPosts={currentPosts} loading={loading} />
						) : (
							<SharedWithMe
								currentPosts={currentPostsShared}
								loading={sharedLoading}
							/>
						)}

						{myform && loading && (
							<div style={{ marginTop: "1rem" }}>
								<b>Loading...</b>
							</div>
						)}
						{!myform && sharedLoading && (
							<div style={{ marginTop: "1rem" }}>
								<b>Loading...</b>
							</div>
						)}
					</div>

					{myform ? (
						<Pagination
							totalPosts={forms.length}
							postsPerPage={postsPerPage}
							setCurrentPage={setCurrentPage}
							currentPage={currentPage}
						/>
					) : (
						<Pagination
							totalPosts={sharedForms.length}
							postsPerPage={postsPerPage}
							setCurrentPage={setSharedCurrentPage}
							currentPage={sharedCurrentPage}
						/>
					)}
				</div>
				<img className="line1" src={line1} alt="misc"></img>
				<div className={`DashboardRight ${profile ? "" : "dNone"}`}>
					<img src={dashboardBgImage2} alt="dash" className="Dashboardbg2" />
					<p className="myprofile">My Profile</p>
					<div className="avatar">
						<img src={avatar} alt="user profile"></img>
						<img src={editprofile} onClick={() => setModalOpened(true)} alt="edit profile"></img>
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
