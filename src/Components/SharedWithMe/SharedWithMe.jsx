import SharedCard from "../SharedCard/SharedCard";
import image1 from "../../images/noform.png";
import { Link } from "react-router-dom";

const SharedWithMe = ({ currentPosts, loading }) => {
	return (
		<>
			{!loading && currentPosts && currentPosts.length === 0 && (
				<div
					style={{
						display: "flex",
						position: "relative",
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
						flexDirection: "column",
						zIndex: "100",
					}}
				>
					<img className="image1" src={image1} alt="unavailable"></img>
					<p align="center">
						Seems like no any shared any form with you ;( wanna{" "}
						<Link to="/user/newform" className="link">
							try creating{" "}
						</Link>
						some formss??
					</p>
				</div>
			)}
			{!loading &&
				currentPosts &&
				currentPosts.map((e, id) => {
					return <SharedCard key={id} {...e} />;
				})}
		</>
	);
};

export default SharedWithMe;
