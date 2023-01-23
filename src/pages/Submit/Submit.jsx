import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import "./Submit.css";
import Text from "../../Components/QuestionTypes/TextSubmit";
import { RiDeleteBin6Line } from "react-icons/ri";
import MultipleChoiceSubmit from "../../Components/QuestionTypes/MultipleChoiceSubmit";
import SingleChoiceSubmit from "../../Components/QuestionTypes/SingleChoiceSubmit";
import toast from "react-hot-toast";
import AttachmentSubmit from "../../Components/QuestionTypes/AttachmentSubmit";

const Submit = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [data, setData] = useState("");
	const [loading, setLoading] = useState(true);
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
	useEffect(() => {
		const docRef = doc(db, "forms", id);
		getDoc(docRef)
			.then((doc) => {
				setData(doc.data());
				setLoading(false);
				if (!doc.exists()) {
					toast.error("This form does not exist");
					navigate("/404");
				}
			})
			.catch((err) => {
				toast.error(err.message);
				setLoading(false);
			});
		// eslint-disable-next-line
	}, []);

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
					navigate("/submitresponse");
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
				{loading && (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							width: "100%",
							height: "100%",
							fontSize: "2rem",
							fontWeight: "bold",
						}}
					>
						Loading...
					</div>
				)}
				{data && (
					<>
						<div className="SubmitFormTop">
							<div className="submitFormTitle">{data.title}</div>
							<button onClick={() => SubmitResponse()}>Submit</button>
						</div>
						<div className="SubmitFormQuestions">
							<p
								className="descriptionSumbit"
								type="text"
								placeholder="Enter the description for the form..."
							>
								{data.description}
							</p>
							{data.questions &&
								data.questions.map((question, uuuid) => {
									return (
										<div className="SubmitFormQuestion" key={uuuid}>
											<div className="SubmitFormQuestionUpper">
												<div className="SubmitFormQuestionId">{uuuid + 1}.</div>
												<div className="SubmitFormQuestionTitle">
													{question.questionTitle}
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
