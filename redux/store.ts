import { combineReducers, configureStore } from "@reduxjs/toolkit";
import drawerReducer from "./slice/drawer/slice";
import storeDetailReducer from "./slice/storeDetail/slice";

const rootReducer = combineReducers({ drawerReducer, storeDetailReducer });

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
