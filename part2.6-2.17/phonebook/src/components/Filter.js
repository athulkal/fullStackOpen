import React from "react";

const Filter = ({ value, searchHandler }) => {
  return (
    <div>
      filter shown with <input value={value} onChange={searchHandler} />
    </div>
  );
};

export default Filter;
