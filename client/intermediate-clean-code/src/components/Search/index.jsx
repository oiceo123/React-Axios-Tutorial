import React from "react";

function Search({
  placeholder,
  onChange,
  classNameButton,
  onClick,
  messageButton,
}) {
  return (
    <>
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        onChange={onChange}
      />
      <button className={classNameButton} onClick={onClick}>
        {messageButton}
      </button>
    </>
  );
}

export default Search;
