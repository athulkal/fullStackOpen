import { useState } from "react";

export const useField = () => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onReset = () => {
    setValue("");
  };

  return {
    value,
    onChange,
    onReset,
  };
};
