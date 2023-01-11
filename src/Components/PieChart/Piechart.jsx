import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const Piechart = (e) => {
	const [data, setData] = useState([]);
	useEffect(() => {
		const makeData = () => {
			const a = [["option", "no. of responses"]];
			for (let i in e.options) {
				let count = 0;
				for (let res in e.rdata) {
					if (e.rdata[res][e.qid] === e.options[i]) {
						count = count + 1;
					}
				}
				a.push([e.options[i], count]);
			}

			setData(a);
		};
		makeData();
	}, [e]);

	const options = {
		is3D: true,
	};
	return (
		<Chart chartType="PieChart" data={data} options={options} width="100%" />
	);
};

export default Piechart;
