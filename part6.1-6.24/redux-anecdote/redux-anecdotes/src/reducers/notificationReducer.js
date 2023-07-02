import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      console.log(action.payload);
      return (state = action.payload);
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;

export const updateNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(setNotification(""));
    }, time * 1000);
  };
};
export default notificationSlice.reducer;
