import { useEffect, useState } from "react";
import {
	collection,
	query,
	where,
	onSnapshot,
	updateDoc,
	doc,
	getDoc,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "@firebase/auth";
import { auth } from "../../Firebase";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";
import { toast } from "react-hot-toast";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import { Modal } from "@mantine/core";
import line1 from "../../images/Line1.png";
import dashboardBgImage1 from "../../images/dash1.png";
import dashboardBgImage2 from "../../images/dash2.png";
import editprofile from "../../images/profile edit button.png";
import Pagination from "../../Components/Pagination/Pagination";
import MyForms from "../../Components/MyForms/MyForms";
import SharedWithMe from "../../Components/SharedWithMe/SharedWithMe";
import loadingProfile from "../../images/no-profile.gif";

import "./Dashboard.css";

function Dashboard() {
	const { currentUser } = useAuth();

	const [forms, setForms] = useState([]);
	const [sharedForms, setSharedForms] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
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
	const [avatarUrl, setAvatarUrl] = useState([]);
	const [finalUrl, setFinalUrl] = useState();
	const storage = getStorage();
	const ref1 = doc(db, "users", currentUser.uid);
	const updateUrl = async () => {
		const docSnap = await getDoc(ref1);
		setFinalUrl(docSnap.data().profileImg);
	};
	const changeProfile = async (m) => {
		await updateDoc(ref1, {
			profileImg: m,
		});
		updateUrl();
		setModalOpened(false);
	};
	useEffect(() => {

		updateUrl();			//eslint-disable-next-line
	}, [])


	useEffect(() => {
		const getProfile = async () => {
			const profileRef = ref(storage, "Profile_Image/");
			const profiles = await listAll(profileRef);
			for (let i in profiles.items) {
				const profileUrl = await getDownloadURL(
					ref(storage, profiles.items[i].fullPath)
				);
				setAvatarUrl((prev) => [...new Set([...prev, profileUrl])]);
			}
		};
		getProfile();
		//eslint-disable-next-line
	}, []);

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
				fetchSharedForms();
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
				className="mainModal"
				opened={modalOpened}
				onClose={() => setModalOpened(false)}
				title={<h2 className="avatarHeading">Choose the avatar</h2>}
			>
				<div className="avatarsModal">
					{avatarUrl.map((m, id) => {
						return (
							<img
								src={m}
								onClick={() => changeProfile(m)}
								alt="profile"
								key={id}
							/>
						);
					})}
				</div>
			</Modal>
			<div className="Dashboard">
				<div className={`DashboardLeft ${profile ? "dNone" : ""}`}>
					<img src={dashboardBgImage1} alt="dash" className="Dashboardbg1" />
					<div className="DashboardLeftTop">
						<div className="heading">
							<p>My Forms</p>
						</div>
						<div className="DashboardLeftTopRight">
							<Link to={"/user/newform"} style={{ zIndex: 10 }}>
								<div className="DashboardCreateButton">+ Create</div>
							</Link>
							<img className="upperProfile"
								src={finalUrl ? finalUrl : loadingProfile}
								alt="user profile"
								onClick={() => setProfile(true)}
							></img>
						</div>
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
							overflowY: "scroll",
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
					<div className="upperHeading">
						<div className="back" onClick={() => setProfile(false)}><BiArrowBack size={"1.5em"} /></div>
						<p className="myprofile" style={{ textAlign: "center" }}>My Profile</p>
						<div className="empty"></div>
					</div>
					<div className="avatar">
						<img
							src={finalUrl ? finalUrl : loadingProfile}
							alt="user profile"
						></img>
						<img
							src={editprofile}
							onClick={() => setModalOpened(true)}
							alt="edit profile"
						></img>
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
