import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
} || {
  user: "",
};

const isSignedInUser = createSlice({
  name: "isSignedInUser",
  initialState,
  reducers: {
    userSignedIn: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    userSignedOut: (state) => {
      state.user = "";
      localStorage.setItem("user", JSON.stringify(""));
    },
  },
});

export const { userSignedIn, userSignedOut } = isSignedInUser.actions;
export default isSignedInUser.reducer;
