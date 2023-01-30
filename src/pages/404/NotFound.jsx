import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
	return (
		<div className="NotFoundPageContainer">
			<div className="NotFoundPage">
				<main className="container">
					{[...Array(40)].map((e, i) => (
						<span className="particle" key={`${i}1404`}>
							4
						</span>
					))}

					{[...Array(40)].map((e, i) => (
						<span className="particle" key={`${i}0404`}>
							0
						</span>
					))}

					<article className="content">
						<p>Damnit stranger,</p>
						<p>
							You got lost in the <strong>404</strong> galaxy.
						</p>
						<p>
							<span style={{ color: "blue" }}>{`{`}</span>
							<span style={{ color: "red" }}>
								<span style={{ textDecoration: "line-through", color: "grey" }}>
									server
								</span>{" "}
								client error
							</span>
							:<span style={{ color: "black" }}> planet not found</span>
							<span style={{ color: "blue" }}>{`}`}</span>
						</p>
						<p>
							<Link to="/">
								<button>Go back to earth.</button>
							</Link>
						</p>
					</article>
				</main>
			</div>
		</div>
	);
};

export default NotFound;
