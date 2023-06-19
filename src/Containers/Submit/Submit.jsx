import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { RiDeleteBin6Line } from "react-icons/ri";
import Text from "../../Components/QuestionTypes/TextSubmit";
import MultipleChoiceSubmit from "../../Components/QuestionTypes/MultipleChoiceSubmit";
import SingleChoiceSubmit from "../../Components/QuestionTypes/SingleChoiceSubmit";
import toast from "react-hot-toast";
import AttachmentSubmit from "../../Components/QuestionTypes/AttachmentSubmit";

const Submit = ({ data, id }) => {
	const navigate = useNavigate();
	const [fileUpload, setFileUpload] = useState(false);
	const [responses, setResponses] = useState({});

	const setAnsText = (questionID, ans) => {
		const a = responses;
		a[questionID] = ans;
		setResponses({ ...a });
	};

	const setAnsMultiple = (questionID, ans) => {
		const a = responses;
		if (a[questionID]) {
			if (a[questionID].includes(ans)) {
				const index = a[questionID].indexOf(ans);
				a[questionID].splice(index, 1);
			} else {
				a[questionID].push(ans);
			}
		} else {
			a[questionID] = [ans];
		}
		setResponses({ ...a });
	};

	const setAnsSingle = (questionID, ans) => {
		const a = responses;
		a[questionID] = ans;
		setResponses({ ...a });
	};

	const clearAns = (questionID) => {
		const a = responses;
		a[questionID] = "";
		setResponses({ ...a });
	};
	const SubmitResponse = () => {
		const checkForm = () => {
			for (let i in data.questions) {
				if (data.questions[i].isRequired) {
					if (!responses[data.questions[i].questionId]) {
						return false;
					}
				}
			}
			return true;
		};
		if (fileUpload) {
			toast.error("Please wait for the file upload to finish");
			return;
		} else if (!checkForm()) {
			toast.error("Please fill all the required fields");
			return;
		} else {
			const promise = () => {
				return new Promise((resolve, reject) => {
					try {
						const a = responses;
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
						a.time = time;
						const docRef = doc(db, "responses", id);
						getDoc(docRef)
							.then((snapshot) => {
								const oldData = snapshot.data();
								updateDoc(docRef, {
									responses: [...oldData.responses, a],
								})
									.then(resolve())
									.catch((err) => {
										reject(err.message);
									});
							})

							.catch((err) => {
								reject(err.message);
							});
					} catch {
						reject("some error occured");
					}
				});
			};
			toast.promise(promise(), {
				loading: "submitting...",
				success: () => {
					navigate("/submitresponse", {
						state: {	
							id: id,
							name: data.title,
							submitText: data.submitText,
						},
					});
					return "response submitted";
				},
				error: (err) => {
					return `${err}`;
				},
			});
		}
	};

	return (
		<div className="Submit">
			<div className="SubmitContent">
				{data && (
					<>
						<div className="SubmitFormTop">
							<div className="submitFormTitle">{data.title}</div>
							<button onClick={() => SubmitResponse()}>Submit</button>
						</div>
						<div className="SubmitFormQuestions">
							<div className="descriptionSumbit">
								<h3>{data.title}</h3>
								<p>{data.description}</p>
							</div>
							{data.questions &&
								data.questions.map((question, uuuid) => {
									return (
										<div className="SubmitFormQuestion" key={uuuid}>
											<div className="SubmitFormQuestionUpper">
												<div className="SubmitFormQuestionId">{uuuid + 1}.</div>
												<div className="SubmitFormQuestionTitle">
													{question.questionTitle}{" "}
													{question.questionType === "text" && (
														<span
															style={{
																fontSize: "0.8rem",
																color: "grey",
																marginLeft: "0.5rem",
															}}
														>
															(
															{responses[question.questionId]
																? responses[question.questionId].length
																: 0}
															/{question.maxChoice})
														</span>
													)}
												</div>
												{question.isRequired && (
													<p className="SubmitFormCompulsory">*</p>
												)}
											</div>
											<div className="SubmitFormQuestionMiddle">
												{question.questionType === "text" && (
													<Text
														setAnsText={setAnsText}
														responses={responses}
														questionID={question.questionId}
														max={question.maxChoice}
													/>
												)}
												{question.questionType === "multipleChoice" && (
													<MultipleChoiceSubmit
														options={question.options}
														questionID={question.questionId}
														setAnsMultiple={setAnsMultiple}
														responses={responses}
													/>
												)}
												{question.questionType === "singleChoice" && (
													<SingleChoiceSubmit
														options={question.options}
														questionID={question.questionId}
														setAnsSingle={setAnsSingle}
														responses={responses}
													/>
												)}
												{question.questionType === "attachment" && (
													<AttachmentSubmit
														questionID={question.questionId}
														setAnsText={setAnsText}
														responses={responses}
														fileUpload={fileUpload}
														setFileUpload={setFileUpload}
														id={id}
														fileType={question.fileType}
														maxSize={question.maxSize}
													/>
												)}
											</div>
											<div className="SubmitFormQuestionLower">
												<div
													className="SubmitFormQuestionClear"
													onClick={() => clearAns(question.questionId)}
												>
													<p>Clear</p>
													<RiDeleteBin6Line className="SubmitFormQuestionClear-icon" />
												</div>
											</div>
										</div>
									);
								})}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Submit;
