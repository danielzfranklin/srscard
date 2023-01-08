import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import counterReducer from "../features/counter/counterSlice";
import decksReducer from "../features/deck/decksSlice";

export const store = configureStore({
  reducer: {
    decks: decksReducer,
    counter: counterReducer,
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

export type EpochMillis = number;
export type UUID = string;

export function uuid(): UUID {
  return uuidv4();
}

export function now(): EpochMillis {
  return Date.now();
}
