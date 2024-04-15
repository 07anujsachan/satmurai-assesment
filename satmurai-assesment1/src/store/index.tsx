import { allSagas } from "./sagas";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { citySlice } from "./citySlice";
const sagaMiddleware = createSagaMiddleware();

const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }).concat(sagaMiddleware);

export const store = configureStore({
  reducer: { cities: citySlice },
  middleware: middleware,
});
sagaMiddleware.run(allSagas);