import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
);
const Bargraph = (e) => {
	const [responses, setResponses] = useState([]);

	useEffect(() => {
		setResponses([]);
		let a = [];
		for (let i in e.options) {
			let count = 0;
			for (let j in e.rdata) {
				if (e.rdata[j][e.qid] && e.rdata[j][e.qid].includes(e.options[i])) {
					count = count + 1;
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
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 1,
			},
		],
	};
	return <Radar data={data} />;
};

export default Bargraph;
