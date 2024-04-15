import { all } from "redux-saga/effects";
import { citiesSagas } from "./citySaga";

export function* allSagas() {
  yield all([...citiesSagas]);
}
