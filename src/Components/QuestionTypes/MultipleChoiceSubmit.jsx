import "./QuestionTypes.css";

const MultipleChoiceSubmit = ({
	options,
	setAnsMultiple,
	questionID,
	responses,
}) => {
	return (
		<div className="multipleChoiceType">
			{options.map((option, id) => {
				return (
					<div className="option" key={id}>
						<input
							type="checkbox"
							name={`${option} ${questionID}`}
							onChange={(e) => setAnsMultiple(questionID, option)}
							checked={
								responses[questionID] && responses[questionID].includes(option)
							}
						/>
						<div className="multipleChoiceTypeSubmit">{option}</div>
					</div>
				);
			})}
		</div>
	);
};

export default MultipleChoiceSubmit;
