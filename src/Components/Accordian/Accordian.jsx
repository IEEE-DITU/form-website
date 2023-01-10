import "./Accordian.css";

const Accordian = ({ response, fdata }) => {
	console.log(response, fdata);
	return (
		<div className="Accordian">
			<div className="accordianData">
				{fdata.map((question, id) => {
					return (
						<div key={id} className="accordianChild">
							<p>{question.questionTitle}</p>
							<p>
								{">"} {response[question.questionId]}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Accordian;
