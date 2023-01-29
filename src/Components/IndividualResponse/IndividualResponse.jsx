import Accordian from "../Accordian/Accordian";
import Noresponse from "../Noresponse/Noresponse";

const IndividualResponse = ({ loading, rdata, fdata, setModalOpened }) => {
	return (
		<div className="individualContainer">
			{loading && (
				<b
					style={{
						margin: "auto",
					}}
				>
					Loading...
				</b>
			)}
			{!loading && rdata && rdata.length < 1 && (
				<div>
					<Noresponse setModalOpened={setModalOpened} />
				</div>
			)}
			{!loading &&
				rdata &&
				rdata.map((response, id) => {
					return <Accordian key={id} response={response} fdata={fdata} />;
				})}
		</div>
	);
};

export default IndividualResponse;
