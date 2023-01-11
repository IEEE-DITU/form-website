import { useParams } from "react-router-dom";
import { BsShareFill } from "react-icons/bs";
import "./Response.css";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import IndividualResponse from "../../Components/IndividualResponse/IndividualResponse";
import SummaryResponse from "../../Components/SummaryResponse/SummaryResponse";

const Response = () => {
	const { id } = useParams();
	const [rdata, setRdata] = useState("");
	const [fdata, setFdata] = useState("");
	const [loading, setLoading] = useState(true);
	const [summary, setSummary] = useState(true);
	useEffect(() => {
		const unsub = () => {
			onSnapshot(doc(db, "responses", id), (doc) => {
				const a = doc.data();
				setRdata(a.responses);
				setLoading(false);
			});
			onSnapshot(doc(db, "forms", id), (doc) => {
				const a = doc.data();
				setFdata(a.questions);
				setLoading(false);
			});
		};
		return unsub();
		// eslint-disable-next-line
	}, []);
	return (
		<div className="Response">
			<div className="ResponseTop">
				<div className="heading">
					<p>{rdata ? rdata.length : 0} Responses</p>
				</div>

				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						gap: "1rem",
					}}
				>
					<BsShareFill style={{ color: "#6D7B94", fontSize: "1.3rem" }} />
					<FaBars style={{ color: "#6D7B94", fontSize: "1.3rem" }} />
				</div>
			</div>
			<div className="responseContent">
				<div className="responseSwitcher">
					<div
						className={`Summary ${summary ? "active" : ""}`}
						onClick={() => setSummary(true)}
					>
						<p>Summary</p>
					</div>
					<div
						className={`Individual  ${summary ? "" : "active"}`}
						onClick={() => setSummary(false)}
					>
						<p>Individual</p>
					</div>
				</div>
				{summary ? (
					<SummaryResponse rdata={rdata} loading={loading} fdata={fdata} />
				) : (
					<IndividualResponse rdata={rdata} loading={loading} fdata={fdata} />
				)}
			</div>
		</div>
	);
};

export default Response;
