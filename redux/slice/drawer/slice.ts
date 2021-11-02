import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DrawerState } from "./types";

export const initialState: DrawerState = {
  isDrawerOpen: false,
};

const reducers = {
  handleDrawerOpen(state: DrawerState, action: PayloadAction<boolean>) {
    state.isDrawerOpen = action.payload;
  },
};

export const slice = createSlice({
  name: "drawer",
  initialState,
  reducers,
});

export const { handleDrawerOpen: drawerActions } = slice.actions;

export default slice.reducer;
