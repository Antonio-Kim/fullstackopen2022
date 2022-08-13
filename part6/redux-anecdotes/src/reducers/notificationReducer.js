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

export const { showMessage } = notificationSlice.actions;

export default notificationSlice.reducer;