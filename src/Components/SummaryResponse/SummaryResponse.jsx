import Bargraph from "../BarGraph/Bargraph";
import Piechart from "../PieChart/Piechart";
import "./SummaryResponse.css";
import Noresponse from "../Noresponse/Noresponse";

const SummaryResponse = ({ loading, rdata, fdata }) => {
	return (
		<div className="summaryContainer">
			{loading && (
				<b
					style={{
						margin: "auto",
					}}
				>
					Loading...
				</b>
			)}
			{!loading && rdata && rdata.length < 1 && (
				<Noresponse/>
			)}
			{!loading &&
				fdata &&
				rdata &&
				rdata.length > 0 &&
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
										<div>
											<Piechart
												rdata={rdata}
												options={question.options}
												qid={question.questionId}
											/>
										</div>
										<div>
											<Bargraph
												rdata={rdata}
												options={question.options}
												qid={question.questionId}
											/>
										</div>
									</div>
								)}
								{question.questionType === "multipleChoice" && (
									<div className="multipleleChoice">
										<div>
											<Piechart
												rdata={rdata}
												options={question.options}
												qid={question.questionId}
											/>
										</div>
										<div>
											<Bargraph
												rdata={rdata}
												options={question.options}
												qid={question.questionId}
											/>
										</div>
									</div>
								)}
								{question.questionType === "attachment" && (
									<div className="attachment">
										<ol>
											{rdata.map((response, id) => {
												return (
													<li key={id}>
														<a
															href={response[question.questionId]}
															target="_blank"
															rel="noreferrer"
														>
															<span
																style={{ width: "100%", overflow: "hidden" }}
															>
																{response[question.questionId]}
															</span>
															...
														</a>
													</li>
												);
											})}
										</ol>
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
