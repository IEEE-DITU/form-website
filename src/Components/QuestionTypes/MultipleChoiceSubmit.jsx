import "./QuestionTypes.css";

const MultipleChoiceSubmit = ({ options }) => {
	return (
		<div className="multipleChoiceType">
			{options.map((option, id) => {
				return (
					<div className="option" key={id}>
						<input type="checkbox" name={option} />
						<div className="multipleChoiceTypeSubmit">{option}</div>
					</div>
				);
			})}
		</div>
	);
};

export default MultipleChoiceSubmit;
