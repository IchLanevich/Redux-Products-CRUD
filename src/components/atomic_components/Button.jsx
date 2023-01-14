import React from "react";

const Button = (props) => {
  return (
    <button
      {...props}
      className="hover:bg-gray-700 p-3 rounded flex justify-center items-center gap-2"
    >
      {props.icon ? props.icon : null}
      {props.value ? props.value : null}
    </button>
  );
};

export default Button;
