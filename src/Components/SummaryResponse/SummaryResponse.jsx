import Bargraph from "../BarGraph/Bargraph";
import Piechart from "../PieChart/Piechart";
import "./SummaryResponse.css";

const SummaryResponse = ({ loading, rdata, fdata }) => {
	return (
		<div className="summaryContainer">
			{loading && (
				<b
					style={{
						marginTop: "5rem",
					}}
				>
					Loading...
				</b>
			)}
			{!loading && rdata && rdata.length < 1 && (
				<h3 style={{ marginTop: "2rem" }}>No responses recieved yet</h3>
			)}
			{!loading &&
				fdata &&
				rdata &&
				fdata.length > 0 &&
				fdata.map((question, id) => {
					return (
						<div className="summaryQuestionContainer" key={id}>
							<div className="question">
								<div className="type">
									<p>{question.questionType} type question</p>
								</div>
								<div className="title">
									<p>{id + 1}.</p>
									<p>{question.questionTitle}</p>
								</div>
							</div>
							<div className="summaryResponses">
								{question.questionType === "text" && (
									<div className="text">
										<ol>
											{rdata.map((response, id) => {
												return (
													<li key={id}>
														<p>{response[question.questionId]}</p>
													</li>
												);
											})}
										</ol>
									</div>
								)}
								{question.questionType === "singleChoice" && (
									<div className="singleChoice">
										<Piechart
											rdata={rdata}
											options={question.options}
											qid={question.questionId}
										/>
									</div>
								)}
								{question.questionType === "multipleChoice" && (
									<div className="multipleleChoice">
										<Bargraph
											rdata={rdata}
											options={question.options}
											qid={question.questionId}
										/>
									</div>
								)}
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default SummaryResponse;
