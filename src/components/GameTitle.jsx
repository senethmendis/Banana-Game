import React from "react";

const GameTitle = ({ className }) => {
	return (
		<img
			src="title.png"
			alt="title"
			className={`${className} aspect-auto w-[500px]`}
		/>
	);
};

export default GameTitle;
