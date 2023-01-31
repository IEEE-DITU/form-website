import "./QuestionTypes.css";

const Text = ({ setAnsText, responses, questionID, max }) => {
	function textAreaAdjust(e) {
		const element = document.getElementById(`${questionID}text`);
		element.style.height = "1px";
		element.style.height = 5 + element.scrollHeight + "px";
	}
	return (
		<div className="TextType">
			<textarea
				id={`${questionID}text`}
				type="text"
				placeholder="Insert answer"
				value={responses[questionID]}
				onChange={(e) => {
					e.preventDefault();
					if (
						!e.nativeEvent.data &&
						e.nativeEvent.inputType !== "deleteContentBackward"
					) {
						return;
					}
					setAnsText(questionID, e.target.value);
				}}
				maxLength={max}
				onKeyUp={() => textAreaAdjust()}
			/>
		</div>
	);
};

export default Text;
