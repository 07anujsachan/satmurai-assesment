import { call, put, takeLatest } from "redux-saga/effects";
import { getCityData, getCityWeatherReport } from "../api";

export const Actions = {
  getCities: "get-cities/",
  getCitiesWeather: "get-Weather/",
};

function* getCitiesSaga() {
  yield takeLatest(Actions.getCities + "request", function* (action: any): any {
    try {
      yield put({ type: Actions.getCities + "pending", payload: {} });
      const apiResponse = yield call(() => getCityData(action.payload));
      if (!apiResponse) {
        throw new Error(JSON.stringify(apiResponse));
      }
      yield put({
        type: Actions.getCities + "fullfilled",
        payload: apiResponse.results,
      });
    } catch (error: any) {
      yield put({ type: Actions.getCities + "rejected", payload: error });
    }
  });
}

function* getCitiesWeatherSaga() {
  yield takeLatest(
    Actions.getCitiesWeather + "request",
    function* (action: any): any {
      try {
        yield put({ type: Actions.getCitiesWeather + "pending", payload: {} });
        const apiResponse = yield call(() =>
          getCityWeatherReport(action.payload)
        );
        if (!apiResponse) {
          throw new Error(JSON.stringify(apiResponse));
        }
        yield put({
          type: Actions.getCitiesWeather + "fullfilled",
          payload: apiResponse,
        });
      } catch (error: any) {
        yield put({
          type: Actions.getCitiesWeather + "rejected",
          payload: error,
        });
      }
    }
  );
}
export const citiesSagas = [getCitiesSaga(), getCitiesWeatherSaga()];
