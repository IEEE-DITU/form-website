import Accordian from "../Accordian/Accordian";

const IndividualResponse = ({ loading, rdata, fdata }) => {
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
				<h3 style={{ margin: "auto" }}>No responses recieved yet</h3>
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
