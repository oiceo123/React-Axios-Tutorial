import React from "react";

function Button({ className, message, onClick }) {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {message}
    </button>
  );
}

export default Button;
