import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { RiDeleteBin6Line } from "react-icons/ri";
import Dropdown from "react-dropdown";
import Text from "../../Components/QuestionTypes/Text";
import ToggleSwitch from "../../Components/ToggleSwitch/ToggleSwitch";
import MultipleChoice from "../../Components/QuestionTypes/MultipleChoice";
import SingleChoice from "../../Components/QuestionTypes/SingleChoice";
import toast from "react-hot-toast";
import "./Newform.css";

const Newform = () => {
	const { currentUser } = useAuth();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: "Untitled Form",
		creatorId: currentUser.uid,
		createdAt: "",
		questions: [],
		acceptingResponses: true,
		id: v4(),
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
	};

	const deleteQuestion = (index) => {
		let a = questions;
		if (a.length > 1) {
			a.splice(index, 1);
			setQuestions([...a]);
		}
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
			if (a.length > 1) {
				a.splice(index, 1);
				question.options = a;
			}
			return question;
		});
		setQuestions([...arr]);
	};
	const singleoption = (questionID, id) => {
		for (let i in questions) {
			const question = questions[i];
			if (question.questionId === questionID) {
				for (let i = 0; i < question.options.length; i++) {
					if (`${i}singleOption` === id) {
						document.getElementById(`${i}singleOption`).checked = true;
					} else {
						document.getElementById(`${i}singleOption`).checked = false;
					}
				}
			}
		}
	};

	const publish = () => {
		const promise = () => {
			return new Promise((resolve, reject) => {
				try {
					let data = formData;
					data.questions = questions;
					const d = new Date();
					const date = d.getDate();
					const month = d.getMonth();
					const year = d.getFullYear();
					const hours = d.getHours();
					const minutes = d.getMinutes();
					const seconds = d.getSeconds();
					const months = [
						"Jan",
						"Feb",
						"Mar",
						"Apr",
						"May",
						"Jun",
						"Jul",
						"Aug",
						"Sep",
						"Oct",
						"Nov",
						"Dec",
					];
					const time = `${date} ${months[month]} ${year} ${hours}:${minutes}:${seconds}`;
					data.createdAt = time;
					const ref = doc(db, "users", currentUser.uid);
					setDoc(doc(db, "responses", formData.id), {
						responses: [],
					}).catch((err) => {
						reject(err);
					});
					setDoc(doc(db, "forms", formData.id), {
						...formData,
					})
						.catch((err) => {
							reject(err);
						})
						.then(
							getDoc(ref)
								.then((snapshot) => {
									const oldData = snapshot.data();
									updateDoc(ref, {
										forms: [...oldData.forms, data.id],
									});
								})
								.catch((err) => {
									reject(err);
								})
						)

						.then(() => resolve())
						.catch((err) => {
							reject(err);
						});
				} catch (err) {
					reject(err);
				}
			});
		};

		toast.promise(promise(), {
			loading: "publishing...",
			success: () => {
				navigate("/user/dashboard");
				return "published!";
			},
			error: (err) => {
				return `${err}`;
			},
		});
	};
	return (
		<div className="NewForm">
			<div className="newForm-title">
				<input
					type="text"
					value={formData.title}
					onChange={(event) =>
						setFormData((prev) => ({ ...prev, title: event.target.value }))
					}
					placeholder="Enter you form title here..."
				/>
				<button
					onClick={() => {
						publish();
					}}
				>
					publish
				</button>
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
												changeQuestionTitle(e.target.value, question.questionId)
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
	);
};

export default Newform;
