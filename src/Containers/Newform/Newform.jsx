import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { db } from "../../Firebase";
import { RiDeleteBin6Line } from "react-icons/ri";
import Dropdown from "react-dropdown";
import Text from "../../Components/QuestionTypes/Text";
import ToggleSwitch from "../../Components/ToggleSwitch/ToggleSwitch";
import MultipleChoice from "../../Components/QuestionTypes/MultipleChoice";
import SingleChoice from "../../Components/QuestionTypes/SingleChoice";
import toast from "react-hot-toast";
import "./Newform.css";
import Attachment from "../../Components/QuestionTypes/Attachment";
import { RiDragMoveFill } from "react-icons/ri";

const Newform = () => {
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		title: "Untitled Form",
		creatorId: currentUser.uid,
		createdAt: "",
		questions: [],
		acceptingResponses: true,
		id: v4(),
		description: "",
		submitText:"",
		collaborators: [],
		submit: "",
	});

	const [questions, setQuestions] = useState([
		{
			questionTitle: "",
			questionType: "text",
			questionId: v4(),
			isRequired: false,
			options: [""],
			minChoice: 1,
			maxChoice: 50,
			finalposition: [],
			fileType: "image",
			maxSize: 5,
		},
	]);

	const addQuestion = () => {
		let a = questions;
		a.push({
			questionTitle: "",
			questionType: "text",
			questionId: v4(),
			isRequired: false,
			options: [""],
			minChoice: 1,
			maxChoice: 50,
			fileType: "image",
			maxSize: 5,
		});
		setQuestions([...a]);
	};

	const deleteQuestion = (index) => {
		let a = questions;
		if (a.length > 1) {
			a.splice(index, 1);
			setQuestions([...a]);
		}
	};
	function handleOnDragEnd(result) {
		if (!result.destination) return;
		let newList = questions;
		const [reorderedItem] = newList.splice(result.source.index, 1);
		newList.splice(result.destination.index, 0, reorderedItem);
		setQuestions([...newList]);
	}

	const changeQuestionType = (type, uuid) => {
		const arr = questions.filter((question) => {
			if (question.questionId !== uuid) {
				return question;
			}
			question.questionType = type;
			return question;
		});
		setQuestions([...arr]);
	};
	const questionTypes = [
		{ value: "text", label: "text" },
		{ value: "singleChoice", label: "single choice" },
		{ value: "multipleChoice", label: "multiple choice" },
		{ value: "attachment", label: "attachment" },
	];
	const setRequired = (questionId) => {
		const arr = questions.filter((question) => {
			if (question.questionId !== questionId) {
				return question;
			}
			question.isRequired = !question.isRequired;
			return question;
		});
		setQuestions([...arr]);
	};

	const changeQuestionTitle = (title, questionID) => {
		const arr = questions.filter((question) => {
			if (question.questionId !== questionID) {
				return question;
			}
			question.questionTitle = title;
			return question;
		});
		setQuestions([...arr]);
	};
	const changeWordLimit = (limit, questionID) => {
		const arr = questions.filter((question) => {
			if (question.questionId !== questionID) {
				return question;
			}
			question.maxChoice = limit;
			return question;
		});
		setQuestions([...arr]);
	};

	const changeFileSize = (size, questionID) => {
		const arr = questions.filter((question) => {
			if (question.questionId !== questionID) {
				return question;
			}
			question.maxSize = size;
			return question;
		});
		setQuestions([...arr]);
	};

	const changeFileType = (type, questionID) => {
		const arr = questions.filter((question) => {
			if (question.questionId !== questionID) {
				return question;
			}
			question.fileType = type;
			return question;
		});
		setQuestions([...arr]);
	};

	const addOption = (questionID) => {
		const arr = questions.filter((question) => {
			if (question.questionId !== questionID) {
				return question;
			}
			question.options.push("");
			return question;
		});
		setQuestions([...arr]);
	};

	const editOption = (questionID, text, index) => {
		let options = [];
		const arr = questions.filter((question) => {
			if (question.questionId !== questionID) {
				return question;
			}
			for (let i = 0; i < question.options.length; i++) {
				if (i === index) {
					options.push(text);
				} else {
					options.push(question.options[i]);
				}
			}

			question.options = options;
			return question;
		});
		setQuestions([...arr]);
	};

	const deleteOption = (questionID, index) => {
		const arr = questions.filter((question) => {
			if (question.questionId !== questionID) {
				return question;
			}
			let a = question.options;
			if (a.length > 1) {
				a.splice(index, 1);
				question.options = a;
			}
			return question;
		});
		setQuestions([...arr]);
	};
	const singleoption = (questionID, id) => {
		for (let i in questions) {
			const question = questions[i];
			if (question.questionId === questionID) {
				for (let i = 0; i < question.options.length; i++) {
					if (`${i}singleOption` === id) {
						document.getElementById(`${i}singleOption`).checked = true;
					} else {
						document.getElementById(`${i}singleOption`).checked = false;
					}
				}
			}
		}
	};

	const publish = () => {
		for (let i in questions) {
			if (!questions[i].questionTitle) {
				toast.error("questions cannot be empy!");
				return;
			}
			if (
				questions[i].questionType === "singleChoice" ||
				questions[i].questionType === "multipleChoice"
			) {
				for (let j in questions[i].options) {
					if (!questions[i].options[j]) {
						toast.error("Options cannot be empty!");
						return;
					}
				}
			}
			if (questions[i].questionType === "attachment") {
				if (questions[i].maxSize === "") {
					toast.error("Max size cannot be empty");
					return;
				}
				if (questions[i].maxSize <= 0) {
					toast.error("Max size cannot be less than or equal to 0MB");
					return;
				}
			}
		}
		const promise = () => {
			return new Promise((resolve, reject) => {
				try {
					let data = formData;
					data.questions = questions;
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
					data.createdAt = time;
					const ref = doc(db, "users", currentUser.uid);
					setDoc(doc(db, "responses", formData.id), {
						responses: [],
					}).catch((err) => {
						reject(err);
					});
					setDoc(doc(db, "forms", formData.id), {
						...formData,
					})
						.catch((err) => {
							reject(err);
						})
						.then(
							getDoc(ref)
								.then((snapshot) => {
									const oldData = snapshot.data();
									updateDoc(ref, {
										forms: [...oldData.forms, data.id],
									});
								})
								.catch((err) => {
									reject(err);
								})
						)

						.then(() => resolve())
						.catch((err) => {
							reject(err);
						});
				} catch (err) {
					reject(err);
				}
			});
		};

		toast.promise(promise(), {
			loading: "publishing...",
			success: () => {
				navigate("/user/dashboard");
				return "published!";
			},
			error: (err) => {
				return `${err}`;
			},
		});
	};
	function textAreaAdjust() {
		const element = document.getElementById("descriptionTextArea");
		element.style.minHeight = "1px";
		element.style.minHeight = 15 + element.scrollHeight + "px";
	}
	function submittextAreaAdjust() {
    const element = document.getElementById("submitTextArea");
    element.style.height = "1px";
    element.style.height = 15 + element.scrollHeight + "px";
  }
	return (
    <div className="NewForm">
      <div className="newForm-title">
        <input
          type="text"
          value={formData.title}
          onChange={(event) =>
            setFormData((prev) => ({
              ...prev,
              title: event.target.value,
            }))
          }
          placeholder="Enter you form title here..."
        />

        <button
          onClick={() => {
            publish();
          }}
        >
          publish
        </button>
      </div>

      <div className="newFormQuestions">
        <textarea
          type="text"
          className="inputfield"
          placeholder="Enter the description for the form..."
          value={formData.description}
          onChange={(e) => {
            let a = formData;
            a.description = e.target.value;
            setFormData({ ...a });
          }}
          onKeyUp={() => textAreaAdjust()}
          id="descriptionTextArea"
        />
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="questions1">
            {(provided) => (
              <div
                className="additionaldiv"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {questions.map((question, id) => {
                  return (
                    <Draggable
                      key={question.questionId}
                      draggableId={question.questionId}
                      index={id}
                    >
                      {(provided) => (
                        <div
                          className="newFormQuestion"
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <div className="newFormQuestionUpper">
                            <div className="left">
                              <div className="newFormQuestionId">{id + 1}.</div>
                              <div className="newFormQuestionTitle">
                                <input
                                  type="text"
                                  value={question.questionTitle}
                                  placeholder="Enter question..."
                                  onChange={(e) =>
                                    changeQuestionTitle(
                                      e.target.value,
                                      question.questionId
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="right">
                              <div className="questionChangeType">
                                <Dropdown
                                  options={questionTypes}
                                  onChange={(e) =>
                                    changeQuestionType(
                                      e.value,
                                      question.questionId
                                    )
                                  }
                                  value={question.questionType}
                                  placeholder="Select an option"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="newFormQuestionMiddle">
                            <div className="newFormQuestionAnswerArea">
                              {question.questionType === "text" && (
                                <Text
                                  changeWordLimit={changeWordLimit}
                                  qid={question.questionId}
                                  limit={question.maxChoice}
                                />
                              )}
                              {question.questionType === "multipleChoice" && (
                                <MultipleChoice
                                  options={question.options}
                                  qid={question.questionId}
                                  editOption={editOption}
                                  deleteOption={deleteOption}
                                  setQuestions={setQuestions}
                                  questions={questions}
                                />
                              )}
                              {question.questionType === "singleChoice" && (
                                <SingleChoice
                                  options={question.options}
                                  qid={question.questionId}
                                  editOption={editOption}
                                  deleteOption={deleteOption}
                                  singleoption={singleoption}
                                  setQuestions={setQuestions}
                                  questions={questions}
                                />
                              )}
                              {question.questionType === "attachment" && (
                                <Attachment
                                  changeFileType={changeFileType}
                                  qid={question.questionId}
                                  fileType={question.fileType}
                                  changeFileSize={changeFileSize}
                                  maxSize={question.maxSize}
                                />
                              )}
                            </div>
                          </div>
                          <div className="newFormQuestionLower">
                            {question.questionType !== "text" &&
                              question.questionType !== "attachment" && (
                                <div
                                  className="newFormAddOption"
                                  onClick={() => addOption(question.questionId)}
                                >
                                  <p>+ Add option</p>
                                </div>
                              )}

                            <div className="requiredSwitch">
                              <p>Required</p>
                              <ToggleSwitch
                                id={question.questionId}
                                name="required"
                                checked={question.isRequired}
                                disabled={false}
                                small={true}
                                optionLabels={["true", "false"]}
                                onChange={setRequired}
                              />
                            </div>

                            <div
                              className="newFormQuestionDelete"
                              onClick={() => deleteQuestion(id)}
                            >
                              <p>Delete</p>
                              <RiDeleteBin6Line className="newFormQuestionDelete-icon" />
                            </div>
                          </div>
                          <div
                            className="questionMover"
                            {...provided.dragHandleProps}
                          >
                            <RiDragMoveFill />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <textarea
          type="text"
          className="inputfield"
          placeholder="Enter the submit text for the form..."
          value={formData.submitText}
          onChange={(e) => {
            let a = formData;
            a.submitText = e.target.value;
            setFormData({ ...a });
          }}
          onKeyUp={() => submittextAreaAdjust()}
          id="submitTextArea"
        />
      </div>
      <div className="newFormAddQuestionButton" onClick={() => addQuestion()}>
        + Add Question
      </div>
    </div>
  );
};

export default Newform;
