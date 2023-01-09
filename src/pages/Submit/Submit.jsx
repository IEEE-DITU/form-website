import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import "./Submit.css";
import Text from "../../Components/QuestionTypes/Text";
import { RiDeleteBin6Line } from "react-icons/ri";
import MultipleChoiceSubmit from "../../Components/QuestionTypes/MultipleChoiceSubmit";
import SingleChoiceSubmit from "../../Components/QuestionTypes/SingleChoiceSubmit";
import toast from "react-hot-toast";

const Submit = () => {
	const { id } = useParams();
	const [data, setData] = useState("");
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
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
							<button onClick={() => toast("Under development")}>Submit</button>
						</div>
						<div className="SubmitFormQuestions">
							{data.questions &&
								data.questions.map((question, id) => {
									return (
										<div className="SubmitFormQuestion" key={id}>
											<div className="SubmitFormQuestionUpper">
												<div className="SubmitFormQuestionId">{id + 1}.</div>
												<div className="SubmitFormQuestionTitle">
													{question.questionTitle}
												</div>
												{question.isRequired && (
													<p className="SubmitFormCompulsory">*</p>
												)}
											</div>
											<div className="SubmitFormQuestionMiddle">
												{question.questionType === "text" && <Text />}
												{question.questionType === "multipleChoice" && (
													<MultipleChoiceSubmit options={question.options} />
												)}
												{question.questionType === "singleChoice" && (
													<SingleChoiceSubmit options={question.options} />
												)}
											</div>
											<div className="SubmitFormQuestionLower">
												<div className="SubmitFormQuestionClear">
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
