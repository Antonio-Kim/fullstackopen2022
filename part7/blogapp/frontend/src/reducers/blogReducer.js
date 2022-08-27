import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    visible: false,
  },
  reducer: {
    notify: (state, action) => {},
  },
});

export default blogSlice.reducer;
