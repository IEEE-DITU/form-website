import "./QuestionTypes.css";
import { AiFillCloseCircle } from "react-icons/ai";

const SingleChoice = ({
	options,
	editOption,
	qid,
	deleteOption,
	singleoption,
}) => {
	return (
		<div className="multipleChoiceType">
			{options.map((option, id) => {
				return (
					<div className="option" key={id}>
						<AiFillCloseCircle
							className="multichoiceIcon"
							onClick={() => deleteOption(qid, id)}
						/>
						<input
							type="radio"
							name={id}
							id={`${id}singleOption`}
							onChange={() => {
								singleoption(qid, `${id}singleOption`);
							}}
						/>
						<input
							type="text"
							value={option}
							placeholder="enter option"
							onChange={(e) => editOption(qid, e.target.value, id)}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default SingleChoice;
