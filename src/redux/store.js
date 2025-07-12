import { configureStore } from "@reduxjs/toolkit";
import photographersReducer from "./slices/photo";

export default configureStore({
  reducer: {
    photographers: photographersReducer,
  },
});
