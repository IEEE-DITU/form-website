import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { RiDeleteBin6Line } from "react-icons/ri";
import Dropdown from "react-dropdown";
import Text from "../../Components/QuestionTypes/Text";
import ToggleSwitch from "../../Components/ToggleSwitch/ToggleSwitch";
import MultipleChoice from "../../Components/QuestionTypes/MultipleChoice";
import SingleChoice from "../../Components/QuestionTypes/SingleChoice";
import toast from "react-hot-toast";
import Attachment from "../../Components/QuestionTypes/Attachment";

const EditForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({});
	const [loading, setLoading] = useState(true);
	const [questions, setQuestions] = useState([]);

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
		{ value: "attachment", label: "attachment" },
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
	const changeWordLimit = (limit, questionID) => {
		const arr = questions.filter((question) => {
			if (question.questionId !== questionID) {
				return question;
			}
			question.maxChoice = limit;
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
	function textAreaAdjust() {
		const element = document.getElementById("descriptionTextArea");
		element.style.height = "1px";
		element.style.height = 15 + element.scrollHeight + "px";
	}

	const publish = () => {
		const promise = () => {
			return new Promise((resolve, reject) => {
				try {
					let data = formData;
					data.questions = questions;
					setDoc(doc(db, "forms", formData.id), {
						...formData,
					})
						.catch((err) => {
							reject(err);
						})

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
			loading: "Updating...",
			success: () => {
				navigate("/user/dashboard");
				return "updated!";
			},
			error: (err) => {
				return `${err}`;
			},
		});
	};

	useEffect(() => {
		const ref = doc(db, "forms", id);
		getDoc(ref)
			.then((snapshot) => {
				setFormData(snapshot.data());
				setQuestions(snapshot.data().questions);
			})
			.then(setLoading(false))
			.catch((err) => {
				toast.error(err.message);
			});
		//eslint-disable-next-line
	}, []);

	return (
		<div className="NewForm">
			{loading ? (
				"Loading..."
			) : (
				<>
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
							Update
						</button>
					</div>
					<div className="newFormQuestions">
						<textarea
							type="text"
							className="inputfield"
							placeholder="Enter the description for the form..."
							value={formData.description}
							onChange={(e) => {
								let a = formData;
								a.description = e.target.value;
								setFormData({ ...a });
							}}
							onKeyUp={() => textAreaAdjust()}
							id="descriptionTextArea"
						/>
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
											{question.questionType === "text" && (
												<Text
													changeWordLimit={changeWordLimit}
													qid={question.questionId}
													limit={question.maxChoice}
												/>
											)}
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
											{question.questionType === "attachment" && (
												<Attachment
													// ChangeFileType={changeWordLimit}
													qid={question.questionId}
													// fileType={question.maxChoice}
												/>
											)}
										</div>
									</div>
									<div className="newFormQuestionLower">
										{question.questionType !== "text" &&
											question.questionType !== "attachment" && (
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
					<div
						className="newFormAddQuestionButton"
						onClick={() => addQuestion()}
					>
						+ Add Question
					</div>
				</>
			)}
		</div>
	);
};

export default EditForm;
