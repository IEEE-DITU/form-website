import { useParams } from "react-router-dom";
import { BsShareFill } from "react-icons/bs";
import "./Response.css";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import { CSVLink } from "react-csv";
import { toast } from "react-hot-toast";
import { Drawer, Modal } from "@mantine/core";
import IndividualResponse from "../../Components/IndividualResponse/IndividualResponse";
import SummaryResponse from "../../Components/SummaryResponse/SummaryResponse";
import html2canvas from "html2canvas";
import QRCode from "react-qr-code";

const Response = () => {
	const { id } = useParams();
	const [rdata, setRdata] = useState("");
	const [fdata, setFdata] = useState("");
	const [loading, setLoading] = useState(true);
	const [summary, setSummary] = useState(true);
	const [modalData, setmodalData] = useState("");
	const [modalOpened, setModalOpened] = useState(false);
	const [drawer, setDrawer] = useState(false);
	const [csvData, setCsvData] = useState([]);
	const [csvHeaders, setCsvHeaders] = useState([]);
	function downloadURI(uri, name) {
		var link = document.createElement("a");
		link.download = name;
		link.href = uri;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
	const getImage = () => {
		const domElement = document.getElementById(
			`${modalData.title}-${modalData.createdAt}`
		);
		html2canvas(domElement).then((canvas) => {
			const img = canvas.toDataURL("image/jpeg");
			downloadURI(img, `${modalData.title}-${modalData.createdAt}`);
		});
	};

	useEffect(() => {
		const unsub = () => {
			onSnapshot(doc(db, "responses", id), (doc) => {
				const a = doc.data();
				setRdata(a.responses);
				setCsvData(a.responses);
				setLoading(false);
			});
			onSnapshot(doc(db, "forms", id), (doc) => {
				const a = doc.data();
				setmodalData(a);
				setFdata(a.questions);
				const arrH = [];
				for (let i in a.questions) {
					const obj = {};
					obj.label = a.questions[i].questionTitle;
					obj.key = a.questions[i].questionId;
					arrH.push(obj);
				}
				setCsvHeaders(arrH);
				setLoading(false);
			});
		};
		return unsub();
		// eslint-disable-next-line
	}, []);
	return (
		<>
			<Modal
				opened={modalOpened}
				onClose={() => setModalOpened(false)}
				title={modalData.title}
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
						id={`${modalData.title}-${modalData.createdAt}`}
						style={{
							width: "min-content",
							background: "white",
							padding: "1rem",
						}}
					>
						<QRCode
							className="qr"
							value={`https://jsrforms.live/form/${modalData.id}`}
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
						value={`https://jsrforms.live/form/${modalData.id}`}
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
									.writeText(`https://jsrforms.live/form/${modalData.id}`)
									.then(toast.success("link copied to clipboard"))
									.catch((err) => toast.error(err));
							}}
						>
							Click to copy
						</div>
					</div>
				</div>
			</Modal>
			<Drawer
				opened={drawer}
				onClose={() => setDrawer(false)}
				title="Options"
				position="right"
				padding="md"
				size="md"
			>
				<div
					style={{
						display: "flex",
						justifyContent: "flex-start",
						alignItems: "flex-start",
						flexDirection: "column",
						gap: "1rem",
						paddingTop: "1.5rem",
					}}
				>
					<CSVLink
						style={{
							borderBottom: "1px solid grey",
							width: "100%",
							textAlign: "left",
							paddingBottom: "0.25rem",
							paddingLeft: "0.25rem",
							fontSize: "1rem",
							fontWeight: "500",
							cursor: "pointer",
							color: "black",
						}}
						filename={`${modalData.title}-responses`}
						data={csvData}
						headers={csvHeaders}
						onClick={(e) => {
							if (csvData.length < 1) {
								e.preventDefault();
								toast.error("Can't export empty responses");
								return false;
							}
						}}
					>
						Export to csv
					</CSVLink>
				</div>
			</Drawer>
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
						<BsShareFill
							style={{ color: "#6D7B94", fontSize: "1.3rem" }}
							onClick={() => setModalOpened(true)}
						/>
						<FaBars
							style={{ color: "#6D7B94", fontSize: "1.3rem" }}
							onClick={() => setDrawer(true)}
						/>
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
						<SummaryResponse
							rdata={rdata}
							loading={loading}
							fdata={fdata}
							setModalOpened={setModalOpened}
						/>
					) : (
						<IndividualResponse
							rdata={rdata}
							loading={loading}
							fdata={fdata}
							setModalOpened={setModalOpened}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default Response;
