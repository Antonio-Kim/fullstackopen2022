import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "Hello, world!",
  reducers: {
    showMessage(state, action) {
      return state.message;
    },
  },
});

export const { showMessage } = notificationSlice.actions;

export default notificationSlice.reducer;
