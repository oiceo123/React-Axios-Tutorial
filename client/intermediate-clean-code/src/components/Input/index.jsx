import React from "react";

function Input({ title, type, placeholder, onChange }) {
  return (
    <div className="mb-3">
      <label htmlFor="name" className="form-label">
        {title}:
      </label>
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
