import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../slices/main";

const store = configureStore({
  reducer: rootReducer,
});

export default store;