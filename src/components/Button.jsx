import React from "react";

const Button = ({ onClick, className, type, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} bg-blue-500 text-white text-2xl px-4 py-2 rounded-md hover:scale-110 transition-all`}
    >
      {children}
    </button>
  );
};

export default Button;
