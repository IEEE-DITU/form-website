import { useRef, useState } from "react";
import {
	ref,
	uploadBytesResumable,
	getDownloadURL,
	getStorage,
} from "firebase/storage";
import LoaderSmall from "../LoaderSmall/LoaderSmall";
import toast from "react-hot-toast";
import "./QuestionTypes.css";

const AttachmentSubmit = ({
	setAnsText,
	responses,
	questionID,
	id,
	setFileUpload,
	fileUpload,
}) => {
	const myref = useRef();
	const storage = getStorage();
	const [progress, setProgress] = useState(0);

	const upload = () => {
		setFileUpload(true);
		if (
			!myref.current ||
			!myref.current.files ||
			myref.current.files.length < 1
		) {
			setAnsText(questionID, "");
			setFileUpload(false);
			return;
		}
		const fileName = Date.now() + myref.current.files[0].name;
		const storageRef = ref(storage, `responses/${id}/${fileName}`);
		const uploadTask = uploadBytesResumable(storageRef, myref.current.files[0]);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				setProgress(
					Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
				);
			},
			(error) => {
				toast.error(error.message);
				fileUpload(false);
				return;
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					setAnsText(questionID, url);
					setFileUpload(false);
				});
			}
		);
	};
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
			{!fileUpload && (
				<div
					className={`AttachmentSubmit ${responses[questionID] ? "red" : ""}`}
					onClick={() => {
						myref.current.click();
					}}
				>
					<p style={{ padding: "0.25rem" }}>
						{responses[questionID] &&
						myref.current.files &&
						myref.current.files.length > 0
							? myref.current.files[0].name
							: "Click to Choose File"}
					</p>
				</div>
			)}
			{fileUpload && (
				<div
					className="AttachmentSubmit"
					style={{ backgroundColor: "black", color: "white" }}
				>
					<p style={{ padding: "0.25rem" }}>UpfileUpload file...</p>
					<LoaderSmall />
					<p>{progress}%</p>
				</div>
			)}
			<input
				type="file"
				ref={myref}
				onChange={() => upload()}
				style={{ display: "none" }}
			/>
		</div>
	);
};

export default AttachmentSubmit;
