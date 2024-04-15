import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCitiesWeather } from "../citySlice";
interface City {
  name: string;
  population: number;
}

export const CitiesTableList = () => {
  const cityData = useSelector((state: any) => state.cities.cities);
  const dispatch = useDispatch();
  let [searchTerm, setSearchTerm] = useState("");
  let [citiesData, setCitiesData] = useState<City[]>([]);
  let [suggestions, setSuggestions] = useState<City[]>([]);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const sortedData = [...citiesData].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (sortOrder === "asc") {
        return a.population - b.population;
      } else if (sortOrder === "des") {
        return b.population - a.population;
      } else if (sortOrder === "a-z") {
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      } else if (sortOrder === "z-a") {
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      }
      // Default return
      return 0;
    }) as City[];
    setCitiesData(sortedData);
  }, [sortOrder, citiesData]);

  useEffect(() => {
    setCitiesData((prev: City[]) => [...prev, ...cityData]);
  }, [cityData]);

  useEffect(() => {
    const filteredSuggestions = citiesData.filter((item: any) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (searchTerm) {
      setSuggestions(filteredSuggestions);
    }
  }, [searchTerm, citiesData]);

  const updateSearchTerm = (city: any) => {
    setSearchTerm(city);

    const filteredData = citiesData.filter(
      (item: any) => item.name.toLowerCase() === city.toLowerCase()
    );
    setCitiesData(filteredData);
    console.log(filteredData);
  };

  return (
    <div>
      <h1 className="text-center text-4xl my-8 font-bold underline underline-offset-8">
        {" "}
        All Cities
      </h1>
      <div className="flex justify-between w-[95%]">
        <div>
          <input
            type="search"
            placeholder="🔍 Enter city name"
            name="search"
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            className="ml-20 mb-4  border p-2 "
          />
          {suggestions && searchTerm && (
            <div className="ml-20 border bg-[#dddbdb ] mb-10">
              {suggestions.map((suggestion: any) => (
                <div
                  className="m-1"
                  onClick={() => updateSearchTerm(suggestion.name)}
                >
                  {suggestion.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="filter">Sort by:</label>

          <select
            name="filter"
            id="filter"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="select">select</option>
            <option value="asc">population low to high</option>
            <option value="des">population high to low</option>
            <option value="a-z">a-z</option>
            <option value="z-a">z-a</option>
          </select>
        </div>
      </div>
      <table className="border border-black w-[90%] my-0 mx-auto">
        <tr>
          <th className="border border-black p-4 text-xl bg-[#FBDAB5]">
            City Name
          </th>
          <th className="border border-black p-4  text-xl bg-[#FBDAB5]">
            Country
          </th>
          <th className="border border-black p-4  text-xl bg-[#FBDAB5]">
            Population
          </th>
          <th className="border border-black p-4 text-xl bg-[#FBDAB5]">
            Latitude
          </th>
          <th className="border border-black p-4 text-xl bg-[#FBDAB5]">
            Longitude
          </th>
          <th className="border border-black p-4 text-xl bg-[#FBDAB5]">
            Timezone
          </th>
        </tr>
        <tbody>
          {citiesData.map((city: any, index) => {
            return (
              <tr key={index}>
                <Link
                  onClick={() =>
                    dispatch(
                      getCitiesWeather({
                        lat: city.coordinates.lat,
                        lon: city.coordinates.lon,
                      })
                    )
                  }
                  className="block border-auto border border-black p-2"
                  to={"/weather"}
                >
                  <th className="text-left">{city.ascii_name}</th>
                </Link>
                <th className="border border-black p-2">{city.cou_name_en}</th>
                <th className="border border-black p-2">{city.population}</th>
                <th className="border border-black p-2">
                  {city.coordinates.lat}
                </th>
                <th className="border border-black p-2">
                  {city.coordinates.lon}
                </th>
                <th className="border border-black p-2">{city.timezone}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
