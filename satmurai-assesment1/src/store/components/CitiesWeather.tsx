import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";

export const CitiesWeatherReport = () => {
  const citiesWeatherData = useSelector(
    (state: any) => state.cities.cityWeather
  ) as any;
  console.log(citiesWeatherData);
  const weather =
    citiesWeatherData.weather &&
    citiesWeatherData?.weather.map((w: any) => w.main).toString();
  console.log(weather);
  const timeConvert = (timeString: any, zone: any) => {
    let sunTime = moment
      .utc(timeString, "X")
      .add(zone, "seconds")
      .format("HH:mm a");
    return sunTime;
  };
  return (
    <div
      style={{
        backgroundImage:
          weather === "Rain"
            ? `url(${process.env.PUBLIC_URL}/rain.png)`
            : weather === "Clouds"
            ? `url(${process.env.PUBLIC_URL}/cloudy.webp)`
            : `url(${process.env.PUBLIC_URL}/sunny.jpeg)`,
      }}
      className="p-8 bg-no-repeat bg-cover  h-[100vh]"
    >
      <div>
        <h1 className=" text-center text-6xl mt-8 text-white  font-mono font-bold">
          {" "}
          Weather Insights for you
        </h1>
        <h3 className="text-center text-4xl mt-6  text-white">
          {" "}
          {citiesWeatherData?.name}
        </h3>
        <h2 className="text-center text-6xl mt-16  text-white">
          {citiesWeatherData?.main?.temp} °C <span>|</span>{" "}
          <span className="text-4xl mb-6 ">{weather}</span>
        </h2>
        <p className="text-center mt-4  text-white">
          {" "}
          Feels Like {citiesWeatherData?.main?.feels_like} °C
        </p>
        <div className="flex justify-around mt-16">
          <p className="text-white text-2xl font-semibold">
            Sunrise:{" "}
            {timeConvert(
              citiesWeatherData?.sys?.sunrise,
              citiesWeatherData?.sys?.timezone
            )}{" "}
          </p>
          <p className="text-white text-2xl font-semibold">
            Sunset:{" "}
            {timeConvert(
              citiesWeatherData?.sys?.sunset,
              citiesWeatherData?.sys?.timezone
            )}{" "}
          </p>
          <p className="text-white text-2xl font-semibold">
            Pressure: {citiesWeatherData?.main?.pressure} hPa
          </p>
          <p className="text-white text-2xl font-semibold">
            Sea_level: {citiesWeatherData?.main?.sea_level} m
          </p>
        </div>
        <div className="flex justify-around mt-16">
          <p className="text-white text-2xl font-semibold">
            Min.temp: {citiesWeatherData?.main?.temp_min}{" "}
          </p>
          <p className="text-white text-2xl font-semibold">
            Max.temp: {citiesWeatherData?.main?.temp_max}{" "}
          </p>
          <p className="text-white text-2xl font-semibold">
            Humidity: {citiesWeatherData?.main?.humidity} hPa
          </p>
          <p className="text-white text-2xl font-semibold">
            Wind: {citiesWeatherData?.wind?.speed} m
          </p>
        </div>
      </div>
    </div>
  );
};
