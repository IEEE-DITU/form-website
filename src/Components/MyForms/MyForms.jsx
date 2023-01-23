import DashboardCard from "../DashboardCard/DashboardCard";
import image1 from "../../images/noresponse.png"

const MyForms = ({ currentPosts, loading }) => {
	return (
		<>
			{!loading && currentPosts && currentPosts.length === 0 && (
				<div>
			
                    <img className="image1" src={image1}></img>
                    <p>Seems like you haven't created any forms  yet ;( wanna <a className='link' href="">try creating </a>some formss??</p>

    
				</div>
			)}
			{!loading &&
				currentPosts &&
				currentPosts.map((e, id) => {
					return <DashboardCard key={id} {...e} />;
				})}
		</>
	);
};

export default MyForms;
