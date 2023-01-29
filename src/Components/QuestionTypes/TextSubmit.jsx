import "./QuestionTypes.css";

const Text = ({ setAnsText, responses, questionID, max }) => {
	return (
		<div className="TextType">
			<input
				type="text"
				placeholder="Insert answer"
				value={responses[questionID]}
				onChange={(e) => {
					e.preventDefault();
					setAnsText(questionID, e.target.value);
				}}
				maxLength={max}
			/>
		</div>
	);
};

export default Text;
