import { useParams } from "react-router-dom";
import { Tabs } from "@mantine/core";
import { BsShareFill } from "react-icons/bs";
import "./Response.css";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import Accordian from "../../Components/Accordian/Accordian";

const Response = () => {
	const { id } = useParams();
	const [rdata, setRdata] = useState("");
	const [fdata, setFdata] = useState("");
	const [loading, setLoading] = useState(true);
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
				<Tabs radius="md" color="red" defaultValue="individual">
					<Tabs.List grow position="center">
						<Tabs.Tab value="summary">Summary</Tabs.Tab>
						<Tabs.Tab value="individual">Individual</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="summary" pt="xs">
						summary section is on hold! :) <br /> that's all we know
					</Tabs.Panel>

					<Tabs.Panel value="individual" pt="xs">
						
						<div className="individualContainer">
							{loading && (
								<b
									style={{
										marginTop: "5rem",
									}}
								>
									Loading...
								</b>
							)}
							{rdata &&
								rdata.map((response, id) => {
									return (
										<Accordian key={id} response={response} fdata={fdata} />
									);
								})}
						</div>
					</Tabs.Panel>
				</Tabs>
			</div>
		</div>
	);
};

export default Response;
