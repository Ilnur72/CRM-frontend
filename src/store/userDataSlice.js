import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userDataSlice",
  initialState: { user: {}, totalGuide: null },

  reducers: {
    jwtToken: (state, action) => {
      state.user = action.payload;
    },
    userTodoGuide: (state, action) => {
      state.totalGuide = action.payload;
    },
  },
});

export const { jwtToken, userTodoGuide } = userDataSlice.actions;
export default userDataSlice.reducer;
