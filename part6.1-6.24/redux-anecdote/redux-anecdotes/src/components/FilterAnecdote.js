import React from "react";
import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const FilterAnecdote = () => {
  const dispatch = useDispatch();

  return (
    <div style={{ marginBottom: 10 }}>
      filter <input onChange={(e) => dispatch(filterChange(e.target.value))} />
    </div>
  );
};

export default FilterAnecdote;
