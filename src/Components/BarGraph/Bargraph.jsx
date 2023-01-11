import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const Bargraph = (e) => {
	const [data, setData] = useState([]);
	const a = [
		["Year", "Sales", "Expenses", "Profit"],
		["2014", 1000, 400, 200],
		["2015", 1170, 460, 250],
		["2016", 660, 1120, 300],
		["2017", 1030, 540, 350],
	];
	useEffect(() => {
		const makeData = () => {
			const a = [["option", "no. of responses"]];
			for (let i in e.options) {
				let count = 0;
				for (let res in e.rdata) {
					if (e.rdata[res][e.qid].includes(e.options[i])) {
						count = count + 1;
					}
				}
				a.push([e.options[i], count]);
			}

			setData(a);
		};
		makeData();
	}, [e]);
	console.log(e.rdata);

	return <Chart chartType="Table" width="100%" data={data} />;
};

export default Bargraph;
