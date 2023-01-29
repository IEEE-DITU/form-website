import SharedCard from "../SharedCard/SharedCard";
import image1 from "../../images/noresponse.png";
import { Link } from "react-router-dom";

const SharedWithMe = ({ currentPosts, loading }) => {
	return (
		<>
			{!loading && currentPosts && currentPosts.length === 0 && (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
						flexDirection: "column",
					}}
				>
					<img className="image1" src={image1}></img>
					<p align="center">
						Seems like you haven't created any forms yet ;( wanna{" "}
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
