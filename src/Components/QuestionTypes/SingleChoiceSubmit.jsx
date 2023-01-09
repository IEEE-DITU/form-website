import "./QuestionTypes.css";

const SingleChoiceSubmit = ({
	options,
	questionID,
	setAnsSingle,
	responses,
}) => {
	return (
		<div className="multipleChoiceType">
			{options.map((option, id) => {
				return (
					<div className="option" key={id}>
						<input
							type="radio"
							name={`${questionID}singleOption`}
							id={`${id}singleOption`}
							onClick={() => setAnsSingle(questionID, option)}
							checked={
								responses[questionID] && responses[questionID].includes(option)
							}
						/>
						<label htmlFor={`${id}singleOption`} style={{ width: "100%" }}>
							{option}
						</label>
					</div>
				);
			})}
		</div>
	);
};

export default SingleChoiceSubmit;
