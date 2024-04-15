export const getCityData = (offset: any) => {
  const url =
    `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=18&offset=${offset}`;
  const data = fetch(url)
    .then((response) => response.json())
    .then((data) => data);
  return data;
};

export const getCityWeatherReport = ({ lat, lon }: any) => {
  const API_KEY = "656cce5ae5a14f39639d20d049720114";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const weatherData = fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => data);
  return weatherData;
};
