import React from "react";

const Button = ({ type, label, onClick }) => {
  return (
    <button type="button" className={`btn btn-${type} m-3`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
