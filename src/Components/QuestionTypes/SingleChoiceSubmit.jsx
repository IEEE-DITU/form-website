import "./QuestionTypes.css";

const SingleChoiceSubmit = ({ options }) => {
	return (
		<div className="multipleChoiceType">
			{options.map((option, id) => {
				return (
					<div className="option" key={id}>
						<input type="radio" name={option} id={`${id}singleOption`} />
						<div>{option}</div>
					</div>
				);
			})}
		</div>
	);
};

export default SingleChoiceSubmit;
