import { Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import React from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import toast from "react-hot-toast";
import "./DashboardCard.css";

function DashboardCard(e) {
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
	return (
		<div className="card">
			<div className="cardleft">
				<p className="cardcontent">
					<b>Form Tittle</b> - {e.title}
				</p>
				<p className="cardcontent">
					<b>Form Creation Date</b> - {e.createdAt}
				</p>
				<p className="cardcontent">
					<b>Number of responces</b> - {"in dvlpmnt..."}
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

				<Link className="viewresponse" to={`/user/forms/checkresponse/${e.id}`}>
					view responses
				</Link>
				<div
					onClick={() =>
						toast.success(
							<span>
								To share <b>Copy link from address bar</b>
							</span>
						)
					}
				>
					<Link className="viewresponse" to={`/form/${e.id}`}>
						Preview / Get Link
					</Link>
				</div>
			</div>
		</div>
	);
}
export default DashboardCard;
