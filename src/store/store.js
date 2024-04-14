import { configureStore } from "@reduxjs/toolkit";

import openStateSlice from "./openStateSlice.js";
import userDataSlice from "./userDataSlice.js";

export const store = configureStore({
  reducer: {
    openState: openStateSlice,
    userData: userDataSlice,
  },
});
