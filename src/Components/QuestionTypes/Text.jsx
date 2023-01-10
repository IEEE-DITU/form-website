import "./QuestionTypes.css";

const Text = (e) => {
	return (
		<div className="TextTypeLimit">
			<label htmlFor="number">Enter word limit:</label>
			<input
				type="number"
				id="number"
				placeholder="Word Limit for text type question"
				value={e.limit}
				onChange={(event) => e.changeWordLimit(event.target.value, e.qid)}
			/>
		</div>
	);
};

export default Text;
