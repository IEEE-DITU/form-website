import "./ResponsePage.css";
import data from "./fakedata.json";

const ResponsePage = () => {
	return (
		<div className="ResponsePage">
			<div className="responseHead">
				This is response page with fake designs, data, layout.
			</div>
			<div className="responseDetailsContainer">
				<h1>Form title here, Lorem ipsum dolor sit amet?</h1>
				<p>
					💐Some other details here idk💐,
					<br />
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit cum
					voluptas est quo id tempore alias qui assumenda non minima?
					<br />
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto esse,
					dolores eligendi at aliquam quisquam quos, provident culpa consectetur
					repudiandae voluptatum illum cumque voluptas ipsam impedit animi fugit
					sequi fuga?
				</p>
			</div>
			{data.map((data, id) => (
				<div className="responseQuestionContainer" key={id}>
					<div className="question">
						<p>
							{data.question} {id + 1}?
						</p>
						<p> {data.response}</p>
						<div className="graphs">
							<div className="temporatyGraph">graph</div>
							<div className="temporatyGraph">graph 2</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default ResponsePage;
