import { createSlice } from "@reduxjs/toolkit";

const AuthenticationSlice = createSlice({
  name: "Authentication",
  initialState: {
    newUserCreatedData: false,
    newUserActivatedData: false,
    newUserLoginSuccess: false,
    newUserLoadedSuccess: false,
    passwordChanging: {
      uid: "",
      token: "",
    },
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
    passwordChangeReducer: (state, action) => {
      state.passwordChanging.uid = action.payload.uid;
      state.passwordChanging.token = action.payload.token;
    },
  },
});
export const AuthenticationActions = AuthenticationSlice.actions;
export default AuthenticationSlice;
