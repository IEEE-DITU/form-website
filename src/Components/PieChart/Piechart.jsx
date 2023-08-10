import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Piechart = (e) => {
	const [responses, setResponses] = useState([]);

	useEffect(() => {
		setResponses([]);
		let a = [];
		for (let i in e.options) {
			let count = 0;
			for (let j in e.rdata) {
				if (typeof e.rdata[j][e.qid] === "string") {
					if (e.rdata[j][e.qid] && e.rdata[j][e.qid] === e.options[i]) {
						count = count + 1;
					}
				} else if (typeof e.rdata[j][e.qid] === "object") {
					if (e.rdata[j][e.qid] && e.rdata[j][e.qid].includes(e.options[i])) {
						count = count + 1;
					}
				}
			}
			a.push(count);
			setResponses(a);
		}
	}, [e]);

	const data = {
		labels: e.options,
		datasets: [
			{
				label: "No. of responses",
				data: responses,
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(255, 159, 64, 0.2)",
					"rgba(255, 170, 0, 0.2)",
					"rgba(30, 255, 33, 0.2)",
					"rgba(15, 136, 145, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
					"rgba(255, 170, 0, 1)",
					"rgba(30, 255, 33, 1)",
					"rgba(15, 136, 145, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	return <Pie data={data} />;
};

export default Piechart;
