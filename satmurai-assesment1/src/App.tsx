import React, { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCities } from "./store/citySlice";
import { CitiesTableList } from "./store/components/CitiesTable";
import { CitiesWeatherReport } from "./store/components/CitiesWeather";
import { Route, Routes } from "react-router-dom";


function App() {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(1);

  const handleInfiniteScroll = async () => {
    console.log("scrollHeight" + document.documentElement.scrollHeight);
    console.log("innerHeight" + window.innerHeight);
    console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setOffset((prev) => prev + 18);
        console.log(offset);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(getCities(offset));
  }, [offset]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
  }, []);
  return (
    <Routes>
      <Route path="/" element={<CitiesTableList />}></Route>
      <Route path="/weather" element={<CitiesWeatherReport />}></Route>
    </Routes>
  );
}

export default App;
