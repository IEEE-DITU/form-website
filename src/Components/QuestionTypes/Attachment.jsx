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
				Note: there's a fix size limit for attachment: 20 yottabyte
			</p>
		</div>
	);
};

export default Attachment;
