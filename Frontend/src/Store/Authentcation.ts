import { createSlice } from "@reduxjs/toolkit";

const AuthenticationSlice = createSlice({
  name: "Authentication",
  initialState: {
    newUserCreatedData: false,
    newUserActivatedData: false,
    newUserLoginSuccess: false,
    newUserLoadedSuccess: false,
  },
  reducers: {
    newUserCreatedRed: (state, action) => {
      state.newUserCreatedData = action.payload.created;
      state.newUserActivatedData = action.payload.activated;
    },
    newUserLogInRed: (state, action) => {
      state.newUserLoginSuccess = action.payload.success;
      state.newUserCreatedData = true;
      state.newUserActivatedData = true;
      state.newUserLoadedSuccess = action.payload.loaded;
    },
  },
});
export const AuthenticationActions = AuthenticationSlice.actions;
export default AuthenticationSlice;
