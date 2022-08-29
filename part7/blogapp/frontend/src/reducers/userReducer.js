import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    getUser: (state, action) => {
      return action.payload;
    },
  },
});

export const setUser = () => (dispatch) => {
  const user = userService.getUser();
  dispatch(getUser(user));
};

export const initializeUser = (state) => state.user;
export const { getUser } = userSlice.actions;
export default userSlice.reducer;
