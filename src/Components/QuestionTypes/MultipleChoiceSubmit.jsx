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
							id={`${option}${id}multipleOption`}
						/>
						<label
							htmlFor={`${option}${id}multipleOption`}
							className="multipleChoiceTypeSubmit"
						>
							{option}
						</label>
					</div>
				);
			})}
		</div>
	);
};

export default MultipleChoiceSubmit;
