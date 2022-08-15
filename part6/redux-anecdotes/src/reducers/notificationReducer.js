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

export const showNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(showMessage(message));
    setTimeout(() => dispatch(showMessage("")), 1000 * time);
  };
};

export const { showMessage } = notificationSlice.actions;

export default notificationSlice.reducer;
