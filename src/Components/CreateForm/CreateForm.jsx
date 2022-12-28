import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./CreateForm.css";
import { v4 } from "uuid";
import Dropdown from "react-dropdown";
import Text from "../QuestionTypes/Text";
import { RiDeleteBin6Line } from "react-icons/ri";
import ToggleSwitch from "../ToggleSwitch/ToggleSwith";
import MultipleChoice from "../QuestionTypes/MultipleChoice";
import SingleChoice from "../QuestionTypes/SingleChoice";

const CreateForm = () => {
	const { currentUser } = useAuth();
	const [formData, setFormData] = useState({
		title: "Untitled Form",
		creatorId: currentUser.uid,
		createdAt: "",
		questions: [],
		acceptingResponses: true,
	});
	const [questions, setQuestions] = useState([
		{
			questionTitle: "Enter question..?",
			questionType: "text",
			questionId: v4(),
			isRequired: false,
			options: ["enter option"],
			minChoice: 1,
			maxChoice: 1,
		},
	]);

	const addQuestion = () => {
		let a = questions;
		a.push({
			questionTitle: "Enter question..?",
			questionType: "text",
			questionId: v4(),
			isRequired: false,
			options: ["enter option"],
			minChoice: 1,
			maxChoice: 1,
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
	const setRequired = (questionId) => {
		const arr = questions.filter((question) => {
			if (question.questionId !== questionId) {
				return question;
			}
			question.isRequired = !question.isRequired;
			return question;
		});
		setQuestions([...arr]);
	};

	const changeQuestionTitle = (title, questionID) => {
		const arr = questions.filter((question) => {
			if (question.questionId !== questionID) {
				return question;
			}
			question.questionTitle = title;
			return question;
		});
		setQuestions([...arr]);
	};

	const addOption = (questionID) => {
		const arr = questions.filter((question) => {
			if (question.questionId !== questionID) {
				return question;
			}
			question.options.push("enter option");
			return question;
		});
		setQuestions([...arr]);
	};

	const editOption = (questionID, text, index) => {
		let options = [];
		const arr = questions.filter((question) => {
			if (question.questionId !== questionID) {
				return question;
			}
			for (let i = 0; i < question.options.length; i++) {
				if (i === index) {
					options.push(text);
				
				} else {
					options.push(question.options[i]);
				}
				

			}
			

			question.options = options;
			return question;
		});
		setQuestions([...arr]);
	};

	const deleteOption = (questionID, index) => {
		const arr = questions.filter((question) => {
			if (question.questionId !== questionID) {
				return question;
			}
			let a = question.options;
			a.splice(index, 1);
			question.options = a;
			return question;
		});
		setQuestions([...arr]);
	};
	const singleoption = (questionID, index) => {
		let options = [];
		const arr = questions.filter((question) => {
			if (question.questionId !== questionID) {
				return question;
			}
			for (let i = 0; i < question.options.length; i++) {
				if (i === index) {
					document.getElementById(i).checked = false;
					
				
				} else {
					document.getElementById(i).checked = true;
				}
				

			}
			

			question.options = options;
			return question;
		});
		setQuestions([...arr]);
	};
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
											<input
												type="text"
												value={question.questionTitle}
												placeholder="Enter quetions..."
												onChange={(e) =>
													changeQuestionTitle(
														e.target.value,
														question.questionId
													)
												}
											/>
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
										{question.questionType === "text" && <Text />}
										{question.questionType === "multipleChoice" && (
											<MultipleChoice
												options={question.options}
												qid={question.questionId}
												editOption={editOption}
												deleteOption={deleteOption}
											/>
										)}
										{question.questionType === "singleChoice" && (
											<SingleChoice
												options={question.options}
												qid={question.questionId}
												editOption={editOption}
												deleteOption={deleteOption}
												singleoption={singleoption}

											/>
										)}
									</div>
								</div>
								<div className="newFormQuestionLower">
									{question.questionType !== "text" && (
										<div
											className="newFormAddOption"
											onClick={() => addOption(question.questionId)}
										>
											<p>+ Add option</p>
										</div>
									)}
									<div className="requiredSwitch">
										<p>Required</p>
										<ToggleSwitch
											id={question.questionId}
											name="required"
											checked={question.isRequired}
											disabled={false}
											small={true}
											optionLabels={["true", "false"]}
											onChange={setRequired}
										/>
									</div>

									<div
										className="newFormQuestionDelete"
										onClick={() => deleteQuestion(id)}
									>
										<p>Delete</p>
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
