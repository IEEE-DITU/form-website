import DashboardCard from "../DashboardCard/DashboardCard";

const MyForms = ({ currentPosts, loading }) => {
	return (
		<>
			{!loading && currentPosts.length === 0 && (
				<div>
					<p>Seems like you havn't created any form yet ;)</p>
				</div>
			)}
			{!loading &&
				currentPosts.map((e, id) => {
					return <DashboardCard key={id} {...e} />;
				})}
		</>
	);
};

export default MyForms;
