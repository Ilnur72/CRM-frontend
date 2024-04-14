import { createSlice } from "@reduxjs/toolkit";

const openStateSlice = createSlice({
  name: "openStateSlice",
  initialState: { isOpen: false, isOpenGuide: false },

  reducers: {
    openState: (state) => {
      state.isOpen = !state.isOpen;
    },

    openStateGuide: (state) => {
      state.isOpenGuide = !state.isOpenGuide;
    },
  },
});

export const { openState, openStateGuide } = openStateSlice.actions;
export default openStateSlice.reducer;
