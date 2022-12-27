import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Pagination.css";

const Pagination = ({
	totalPosts,
	postsPerPage,
	setCurrentPage,
	currentPage,
}) => {
	const increase = () => {
		if (currentPage < Math.ceil(totalPosts / postsPerPage)) {
			setCurrentPage((prev) => prev + 1);
		}
	};
	const decrease = () => {
		if (currentPage > 1) {
			setCurrentPage((prev) => prev - 1);
		}
	};
	return (
		<div className="pagination">
			<p className="current">
				{currentPage}/{Math.ceil(totalPosts / postsPerPage)}
			</p>
			<FaChevronLeft className="paginationIcon" onClick={() => decrease()} />
			<FaChevronRight className="paginationIcon" onClick={() => increase()} />
		</div>
	);
};

export default Pagination;
