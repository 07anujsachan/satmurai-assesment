import { createSlice } from "@reduxjs/toolkit";

import { Actions } from "./citySaga";

const initialState = {
  cities: [],

  getCitiesStatus: "",
  getCitiesError: "",
  getCitiesWeatherStatus: "",
  cityWeather: {},
};
export const getCities = (payload: any) => {
  return { type: Actions.getCities + "request" , payload: payload};
};

const citiesSlice = createSlice({
  name: "city",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(Actions.getCities + "pending", (state: any) => {
      state.getCitiesStatus = "pending";
      state.getCitiesError = "";
    });
    builder.addCase(
      Actions.getCities + "fullfilled",
      (state: any, action: any) => {
        state.getCitiesStatus = "fullfilled";
        state.getCitiesError = "";
        state.cities = action.payload;
      }
    );
    builder.addCase(
      Actions.getCities + "rejected",
      (state: any, action: any) => {
        state.getCitiesStatus = "rejected";
        state.getCitiesError = action.payload;
      }
    );
    builder.addCase(Actions.getCitiesWeather + "pending", (state: any) => {
      state.getCitiesWeatherStatus = " pending";
    });
    builder.addCase(
      Actions.getCitiesWeather + "fullfilled",
      (state: any, action: any) => {
        state.getCitiesWeatherStatus = "fullfilled";
        state.cityWeather = action.payload;
      }
    );
    builder.addCase(Actions.getCitiesWeather + "rejected", (state: any) => {
      state.getCitiesWeatherStatus = "rejected";
    });
  },
});

export const citySlice = citiesSlice.reducer;

export const getCitiesWeather = (payload: any) => {
  return { type: Actions.getCitiesWeather + "request", payload: payload };
};
