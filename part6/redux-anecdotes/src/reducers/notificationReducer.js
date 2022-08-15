import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    showMessage(state, action) {
      state = action.payload;
      return state;
    },
  },
});

let timeoutID = 0;

export const showNotification = (message, time) => {
  return async (dispatch) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => dispatch(showMessage("")), 1000 * time);
    dispatch(showMessage(message));
  };
};

export const { showMessage } = notificationSlice.actions;

export default notificationSlice.reducer;
