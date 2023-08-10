import "./QuestionTypes.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { RiDragMoveFill } from "react-icons/ri";
const SingleChoice = ({
	options,
	editOption,
	qid,
	deleteOption,
	singleoption,
	questions,
	setQuestions,
}) => {
	function handleOnDragEnd(result) {
		if (!result.destination) return;

		const arr = questions.filter((question) => {
			if (question.questionId !== qid) {
				return question;
			}
			const [reorderedItem] = question.options.splice(result.source.index, 1);
			question.options.splice(result.destination.index, 0, reorderedItem);
			return question;
		});
		setQuestions([...arr]);
	}
	return (
		<div className="multipleChoiceType">
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="options">
					{(provided) => (
						<div
							className="optionsDropArea"
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{options.map((option, id) => {
								return (
									<Draggable
										key={`${qid}option${id}`}
										draggableId={`${qid}option${id}`}
										index={id}
									>
										{(provided) => (
											<div
												className="option"
												{...provided.draggableProps}
												ref={provided.innerRef}
											>
												<div
													style={{
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
													}}
													{...provided.dragHandleProps}
												>
													<RiDragMoveFill className="multichoiceIcon bigm" />
												</div>

												<AiFillCloseCircle
													className="multichoiceIcon"
													onClick={() => deleteOption(qid, id)}
												/>
												<input
													type="radio"
													name={id}
													id={`${id}singleOption`}
													onChange={() => {
														singleoption(qid, `${id}singleOption`);
													}}
												/>
												<input
													type="text"
													value={option}
													placeholder="enter option"
													onChange={(e) => editOption(qid, e.target.value, id)}
												/>
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
		</div>
	);
};

export default SingleChoice;
