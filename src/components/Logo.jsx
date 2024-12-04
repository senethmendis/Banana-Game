import React from "react";

const Logo = ({ className }) => {
	return (
		<img
			src="logo.png"
			alt="logo"
			className={`w-14 h-14 ${className}`}
		/>
	);
};

export default Logo;
