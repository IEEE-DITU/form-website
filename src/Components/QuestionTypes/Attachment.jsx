// import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import "./QuestionTypes.css";
import { useEffect } from "react";

const Attachment = (e) => {

	return (
		<div className="Attachment">
			<Toaster />
			<div className="maxSizeField">
				<label htmlFor="number">Enter max Attachment size in (MB):</label>
				<input
					type="number"
					id="number"
					placeholder="Max Size"
					value={e.maxSize}
					onChange={(event) => e.changeFileSize(event.target.value, e.qid)}
				/>
			</div>
			<div className="dropdown">
				<label for="filetype">Choose file type:</label>
				<select name="filetype" id="filetype" onChange={(event) => e.changeFileType(event.target.value, e.qid)}>
					<option value="image">image</option>
					<option value="video">video</option>
					<option value="pdf">pdf</option>
					<option value="docx">word</option>
				</select>
			</div>
		</div>
	);
};

export default Attachment;
