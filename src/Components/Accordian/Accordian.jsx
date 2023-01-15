import "./Accordian.css";
import { BiChevronDown } from "react-icons/bi";
import { BiChevronUp } from "react-icons/bi";
import React, { useState } from "react";

const Accordian = ({ response, fdata }) => {
	const [show, setShow] = useState(true);
	return (
		<>
			<section className="mainclass">
				<div className="accordian_title">
					<p className="plus" onClick={() => setShow(!show)}>
						{show ?<BiChevronUp/>  : <BiChevronDown/>}
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
                                            <div className="title">
                                                <h3 className="questiontitle">
												{id+1}.{question.questionTitle}
											</h3>  
											</div>
											<div className="type">
                                                <p className="questiontype">{question.questionType}</p>
											</div>
											
										</div>
										<div>
											<p className="answer">{response[question.questionId]}</p>
										</div>
										
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
