// import { useState } from "react";
import "./QuestionTypes.css";

const Attachment = (e) => {
	return (
		<div className="Attachment">
			<p
				style={{
					color: "grey",
					fontSize: "0.8rem",
				}}
			>
				Note: there's a fix size limit for attachment: 20 mb
			</p>
			<div className="dropdown">
				<label for="filetype">Choose file type:</label>
				<select name="filetype" id="filetype" onChange={(event) => e.changeFileType(event.target.value, e.qid)}>
					<option value="png">png</option>
					<option value="jpg">jpg</option>
					<option value="jpeg">jpeg</option>
					<option value="webp">webp</option>
					<option value="pdf">pdf</option>
					<option value="docx">word</option>
				</select>
			</div>
		</div>
	);
};

export default Attachment;
