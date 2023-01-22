import SharedCard from "../SharedCard/SharedCard";
import image1 from "../../images/noresponse.png"

const SharedWithMe = ({ currentPosts, loading }) => {
	return (
		<>
			{!loading && currentPosts && currentPosts.length === 0 && (
				<div>
					<img className="image1" src={image1}></img>
                    <p>Seems like you haven't got any responses yet ;( you can wait or <a className='link' href="">share this form</a></p>

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
