import { useEffect, useState } from "react";

const ResponseCounter = ({ rdata, option, qid }) => {
	const [count, setcount] = useState(0);
	useEffect(() => {
		setcount(0);
		rdata.map((question) => {
			if (question[qid] && question[qid].includes(option)) {
				setcount((prev) => prev + 1);
			}
		});
	}, [rdata]);

	return <span>{count}</span>;
};

export default ResponseCounter;
