import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./CreateForm.css";
import { v4 } from "uuid";
import Dropdown from "react-dropdown";
import Text from "../QuestionTypes/Text";
import { RiDeleteBin6Line } from "react-icons/ri";

const CreateForm = () => {
	const { currentUser } = useAuth();
	const [formData, setFormData] = useState({
		title: "Untitled Form",
		creatorId: currentUser.uid,
		createdAt: "",
		questions: [],
	});
	const [questions, setQuestions] = useState([
		{
			questionTitle: "Enter question..?",
			questionType: "text",
			questionId: v4(),
		},
	]);

	const addQuestion = () => {
		let a = questions;
		a.push({
			questionTitle: "Enter question..?",
			questionType: "text",
			questionId: v4(),
		});
		setQuestions([...a]);
		console.log(questions);
	};

	const deleteQuestion = (index) => {
		let a = questions;
		a.splice(index, 1);
		setQuestions([...a]);
	};

	const changeQuestionType = (type, uuid) => {
		const arr = questions.filter((question) => {
			if (question.questionId !== uuid) {
				return question;
			}
			question.questionType = type;
			return question;
		});
		setQuestions([...arr]);
	};
	const questionTypes = [
		{ value: "text", label: "text" },
		{ value: "singleChoice", label: "single choice" },
		{ value: "multipleChoice", label: "multiple choice" },
	];
	return (
		<div className="newForm">
			<div className="newForm-main">
				<div className="newForm-title">
					<input
						type="text"
						value={formData.title}
						onChange={(event) =>
							setFormData((prev) => ({ ...prev, title: event.target.value }))
						}
						placeholder="Enter you form title here..."
					/>
				</div>
				<div className="newFormQuestions">
					{questions.map((question, id) => {
						return (
							<div className="newFormQuestion" key={id}>
								<div className="newFormQuestionUpper">
									<div className="left">
										<div className="newFormQuestionId">{id + 1}.</div>
										<div className="newFormQuestionTitle">
											{question.questionTitle}
										</div>
									</div>
									<div className="right">
										<div className="questionChangeType">
											<Dropdown
												options={questionTypes}
												onChange={(e) =>
													changeQuestionType(e.value, question.questionId)
												}
												value={question.questionType}
												placeholder="Select an option"
											/>
										</div>
									</div>
								</div>
								<div className="newFormQuestionMiddle">
									<div className="newFormQuestionAnswerArea">
										<Text />
									</div>
								</div>
								<div className="newFormQuestionLower">
									<div
										className="newFormQuestionDelete"
										onClick={() => deleteQuestion(id)}
									>
										<p>Delete</p>{" "}
										<RiDeleteBin6Line className="newFormQuestionDelete-icon" />
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<div className="newFormAddQuestionButton" onClick={() => addQuestion()}>
					+ Add Question
				</div>
			</div>
		</div>
	);
};

export default CreateForm;
