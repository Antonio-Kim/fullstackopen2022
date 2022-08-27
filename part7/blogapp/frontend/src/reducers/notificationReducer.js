import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: null,
    type: "info",
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
  },
});

export const notify = (message, type) => (dispatch) => {
  dispatch(setMessage(message, type));
  setTimeout(() => {
    dispatch(setMessage({ message: null, type: "info" }));
  }, 3000);
};

export const { setMessage } = notificationSlice.actions;
export const getMessage = (state) => state.notification;

export default notificationSlice.reducer;
