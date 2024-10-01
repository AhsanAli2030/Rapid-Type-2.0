import { configureStore } from "@reduxjs/toolkit";
import AuthenticationSlice from "./Authentcation";

const MainStore = configureStore({
  reducer: {
    Authentication: AuthenticationSlice.reducer,
  },
});

export default MainStore;
