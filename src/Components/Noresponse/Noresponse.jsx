import image1 from "../../images/noresponse.png";
import "./Noresponse.css";
const Noresponse = ({ setModalOpened }) => {
	return (
		<>
			<div
				style={{
					display: "flex",
					width: "100%",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<img className="image1" src={image1} alt="empty"></img>
				<p>
					Seems like you haven't got any responses yet ;( you can wait or
					<span className="link" onClick={() => setModalOpened(true)}>
						{" "}
						share this form
					</span>
				</p>
			</div>
		</>
	);
};

export default Noresponse;
