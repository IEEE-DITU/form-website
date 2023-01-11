import Accordian from "../Accordian/Accordian";

const IndividualResponse = ({ loading, rdata, fdata }) => {
	return (
		<div className="individualContainer">
			{loading && (
				<b
					style={{
						marginTop: "5rem",
					}}
				>
					Loading...
				</b>
			)}
			{!loading && rdata && rdata.length < 1 && (
				<h3 style={{ marginTop: "2rem" }}>No responses recieved yet</h3>
			)}
			{rdata &&
				rdata.map((response, id) => {
					return <Accordian key={id} response={response} fdata={fdata} />;
				})}
		</div>
	);
};

export default IndividualResponse;
