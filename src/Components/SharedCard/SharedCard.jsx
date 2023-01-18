import { Link } from "react-router-dom";
import {
	doc,
	updateDoc,
	deleteDoc,
	getDoc,
	onSnapshot,
} from "firebase/firestore";
import { Modal } from "@mantine/core";
import { db } from "../../Firebase";
import { useAuth } from "../../context/AuthContext";
import React, { useEffect, useState } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import toast from "react-hot-toast";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";

const SharedCard = (e) => {
	const { currentUser } = useAuth();
	const [modalOpened, setModalOpened] = useState(false);
	const [deletemodalOpened, setdeleteModalOpened] = useState(false);
	const [len, setLen] = useState(0);
	const promise = () => {
		return new Promise((resolve, reject) => {
			const ref = doc(db, "forms", e.id);
			updateDoc(ref, {
				acceptingResponses: !e.acceptingResponses,
			})
				.then(() => resolve())
				.catch((err) => {
					reject(err);
				});
		});
	};
	const handleChange = () => {
		toast.promise(promise(), {
			loading: e.acceptingResponses ? "Closing..." : "Opening...",
			success: () => {
				return e.acceptingResponses ? "Closed..." : "Opened...";
			},
			error: (err) => {
				return `${err}`;
			},
		});
	};

	const deleteForm = () => {
		const promise = () => {
			return new Promise((resolve, reject) => {
				try {
					const ref = doc(db, "forms", e.id);
					const ref2 = doc(db, "responses", e.id);
					const ref3 = doc(db, "users", currentUser.uid);
					deleteDoc(ref).catch((err) => console.log(err, "ref"));
					deleteDoc(ref2).catch((err) => console.log(err, "ref2"));
					getDoc(ref3)
						.then((snapshot) => {
							const abc = snapshot.data();
							const oldData = abc.forms;
							const index = oldData.indexOf(e.id);
							if (index > -1) {
								oldData.splice(index, 1);
							}
							updateDoc(ref3, {
								forms: [...oldData],
							}).then(() => {
								setdeleteModalOpened(false);
								resolve();
							});
						})
						.catch((err) => console.log(err, "ref3"));
				} catch {
					reject();
				}
			});
		};

		toast.promise(promise(), {
			loading: "deleting...",
			success: () => {
				return "Deleted!";
			},
			error: (err) => {
				return `${err}`;
			},
		});
	};
	function downloadURI(uri, name) {
		var link = document.createElement("a");
		link.download = name;
		link.href = uri;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
	const getImage = () => {
		const domElement = document.getElementById(`${e.title}-${e.createdAt}`);
		html2canvas(domElement).then((canvas) => {
			const img = canvas.toDataURL("image/jpeg");
			downloadURI(img, `${e.title}-${e.createdAt}`);
		});
	};
	useEffect(() => {
		const unsub = () => {
			onSnapshot(doc(db, "responses", e.id), (doc) => {
				const len = doc.data();
				setLen(len.responses.length);
			});
		};
		return unsub();
		// eslint-disable-next-line
	}, [e]);

	return (
		<>
			<Modal
				opened={modalOpened}
				onClose={() => setModalOpened(false)}
				title={e.title}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
					}}
				>
					<div
						id={`${e.title}-${e.createdAt}`}
						style={{
							width: "160px",
							background: "none",
						}}
					>
						<QRCode
							className="qr"
							value={`https://form-website-seven.vercel.app/form/${e.id}`}
							style={{ minWidth: "10rem" }}
						/>
					</div>
					<input
						style={{
							whiteSpace: "nowrap",
							overflowY: "scroll",
							cursor: "text",
							border: "1px solid grey",
							borderRadius: "5px",
							padding: "0.25rem",
							outline: "none",
							background: "rgb(243, 243, 243)",
							width: "100%",
						}}
						onChange={(e) => e.preventDefault()}
						value={`https://form-website-seven.vercel.app/form/${e.id}`}
					/>
					<div
						style={{ display: "flex", gap: "0.5rem", width: "100%" }}
						className="c253Md"
					>
						<div className="modalButton" onClick={() => getImage()}>
							Download QR
						</div>
						<div
							className="modalButton"
							onClick={() => {
								navigator.clipboard
									.writeText(
										`https://form-website-seven.vercel.app/form/${e.id}`
									)
									.then(toast.success("link copied to clipboard"))
									.catch((err) => toast.error(err));
							}}
						>
							Click to copy
						</div>
					</div>
				</div>
			</Modal>
			<Modal
				opened={deletemodalOpened}
				onClose={() => setdeleteModalOpened(false)}
				title="Confirm Deletion"
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
					}}
				>
					<p style={{ fontWeight: "500" }}>
						Are you sure want to delete {e.title} ?
					</p>
					<div style={{ display: "flex", gap: "1rem" }}>
						<div className="modalButton" onClick={() => deleteForm()}>
							Delete
						</div>
						<div
							className="modalButton2"
							onClick={() => setdeleteModalOpened(false)}
						>
							Cancel
						</div>
					</div>
				</div>
			</Modal>
			<div className="card">
				<div className="cardleft">
					<p className="cardcontent">
						<span style={{ fontWeight: "600" }}>Form Tittle</span> - {e.title}
					</p>
					<p className="cardcontent">
						<span style={{ fontWeight: "600" }}>Form Creation Date</span> -{" "}
						{e.createdAt}
					</p>
					<p className="cardcontent">
						<span style={{ fontWeight: "600" }}>Number of responces</span> -{" "}
						{len}
					</p>
				</div>
				<div className="cardright">
					<div className="responceCloserOpener">
						<p className={e.acceptingResponses ? "open" : "closed"}>
							{e.acceptingResponses ? "Open" : "Closed"}
						</p>
						<ToggleSwitch
							id={`${e.id}responceAccSwitcher`}
							checked={e.acceptingResponses}
							onChange={handleChange}
							small={true}
						/>
					</div>
					<div>
						<Link
							className="viewresponse"
							to={`/user/form/checkresponse/${e.id}`}
						>
							<p className="cardLinks" style={{ cursor: "pointer" }}>
								view responses
							</p>
						</Link>
					</div>
					<div>
						<p className="cardLinks">
							<Link className="viewresponse" to={`/user/form/edit/${e.id}`}>
								<span style={{ cursor: "pointer" }} className="cardLinks">
									Edit{" "}
								</span>
							</Link>
							|
							<span className="cardLinks" onClick={() => setModalOpened(true)}>
								{" "}
								Get Link
							</span>
						</p>
					</div>
					<div>
						<span
							className="closed"
							onClick={() => setdeleteModalOpened(true)}
							style={{ cursor: "pointer" }}
						>
							Delete
						</span>
					</div>
				</div>
			</div>
		</>
	);
};
export default SharedCard;
