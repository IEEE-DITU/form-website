import SharedCard from "../SharedCard/SharedCard";

const SharedWithMe = ({ currentPosts, loading }) => {
	return (
		<>
			{!loading && currentPosts && currentPosts.length === 0 && (
				<div>
					<p>Seems like you have any shared form ;)</p>
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
