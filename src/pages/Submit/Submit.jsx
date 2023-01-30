import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import Submit from "../../Containers/Submit/Submit";
import Formclosed from "../Formclosed/Formclosed";
import toast from "react-hot-toast";
import "./Submit.css";

const SubmitPage = () => {
	const { id } = useParams();
	const [data, setData] = useState("");
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	useEffect(() => {
		const docRef = doc(db, "forms", id);
		const unsub = onSnapshot(
			docRef,
			(snapshot) => {
				setData(snapshot.data());
				setLoading(false);
				if (!snapshot.exists()) {
					toast.error("This form does not exist");
					navigate("/404");
				}
			},
			(error) => {
				toast.error(error.message);
				setLoading(false);
			}
		);
		return unsub;
		// eslint-disable-next-line
	}, []);

	return (
		<>
			{loading && (
				<div className="Submit">
					<div className="SubmitContent">
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "100%",
								height: "100%",
								fontSize: "2rem",
								fontWeight: "bold",
							}}
						>
							Loading...
						</div>
					</div>
				</div>
			)}
			{!loading && data && data.acceptingResponses === true && (
				<Submit data={data} id={id} />
			)}

			{!loading && data && data.acceptingResponses === false && (
				<Formclosed title={data.title} />
			)}
		</>
	);
};

export default SubmitPage;
