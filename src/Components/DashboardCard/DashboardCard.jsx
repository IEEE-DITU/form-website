import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
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
import "./DashboardCard.css";

function DashboardCard(e) {
	const { currentUser } = useAuth();
	const [modalOpened, setModalOpened] = useState(false);
	const [qr, setQr] = useState(false);


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
					}}
				>
					<input
						style={{
							whiteSpace: "nowrap",
							overflow: "scroll",
							cursor: "text",
							border: "1px solid grey",
							borderRadius: "5px",
							padding: "0.25rem",
							outline: "none",
							background: "rgb(243, 243, 243)",
						}}
						onChange={(e) => e.preventDefault()}
						value={`https://form-website-seven.vercel.app/form/${e.id}`}
					/>
					<div
						className="modalButton"
						onClick={() => {
							navigator.clipboard
								.writeText(`https://form-website-seven.vercel.app/form/${e.id}`)
								.then(toast.success("link copied to clipboard"))
								.catch((err) => toast.error(err));
						}}
					>
						click to copy
					</div>
				</div>
			</Modal>
			<Modal
				opened={qr}
				onClose={() => setQr(false)}
				title={e.title}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
					}}
				>
					<QRCode className="qr"
						
						onChange={(e) => e.preventDefault()}
						value={`https://form-website-seven.vercel.app/form/${e.id}`}
					/>
					<a href={QRCode} className="modalButton" download = "qrcode.png">Download as png</a>
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
							<span
								onClick={() => setModalOpened(true)}
								style={{ cursor: "pointer" }}
							>
								Get Link{" "}
							</span>
							<span
								onClick={() => setQr(true)}
								style={{ cursor: "pointer" }}
							>
							| generate QR{" "}
							</span>
							|
							<Link className="viewresponse" to={`/user/form/edit/${e.id}`}>
								<span style={{ cursor: "pointer" }} className="cardLinks">
									{" "}
									Edit
								</span>
							</Link>
						</p>
					</div>
					<div
						onClick={() => setdeleteModalOpened(true)}
						style={{ cursor: "pointer" }}
					>
						<p className="closed">Delete</p>
					</div>
				</div>
			</div>
		</>
	);
}
export default DashboardCard;
