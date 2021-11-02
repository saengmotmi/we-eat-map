import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreDetailState } from "./types";

export const initialState: StoreDetailState = {};

const reducers = {
  handleStoreDetail(
    state: StoreDetailState,
    action: PayloadAction<StoreDetailState>
  ) {
    state = action.payload;
  },
};

export const slice = createSlice({
  name: "storeDetail",
  initialState,
  reducers,
});

export const { handleStoreDetail: storeDetailActions } = slice.actions;

export default slice.reducer;
