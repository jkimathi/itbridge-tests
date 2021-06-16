import { configureStore,
 ThunkAction, Action } from "@reduxjs/toolkit";

import navReducer from "../features/navigation/navigationSlice";

export const store = configureStore({
  reducer: {
    navigationVal: navReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
