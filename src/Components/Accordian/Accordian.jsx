import "./Accordian.css";
import React, { useState } from "react";

const Accordian = ({ response, fdata }) => {
	const [show, setShow] = useState(true);
	return (
		<>
			<section className="mainclass">
				<div className="accordian_title">
					<p className="plus" onClick={() => setShow(!show)}>
						{show ? "➖" : "✖️"}
					</p>
					<h3 className="responses">
						<center>RESPONSE</center>
					</h3>
				</div>

				<div>
					{fdata.map((question, id) => {
						return (
							<div key={id}>
								{show && (
									<div className="accordian_response">
										<div className="main-heading">
											<h3 className="questiontitle">
												1.{question.questionTitle}
											</h3>
											<h3 className="questiontype">{question.questionType}</h3>
										</div>
										<p className="answer">{response[question.questionId]}</p>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</section>
		</>
	);
};

export default Accordian;
