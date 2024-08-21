import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Components/weather.css";

// -------------Images--------------
import sun from "../Images/01d.png";
import nightMoon from "../Images/01n.png";
import cloudSun from "../Images/02d.png";
import fewnight from "../Images/02n.png";
import cloudy from "../Images/03n.png";
import clouds from "../Images/04nd.png";
import showerRain from "../Images/09nd.png";
import sunRain from "../Images/10d.png";
import rainNight from "../Images/10n.png";
import thunderstorm from "../Images/11nd.png";
import snow from "../Images/13nd.png";
import mist from "../Images/mist.png";

import wind from "../Images/wind.png";
import humidity from "../Images/humidity.png";
import temperature from "../Images/hot.png";

const Weather = () => {
  const [input, setInput] = useState();
  const [cityname, setCityname] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [Humidity, setHumidity] = useState();
  const [winds, setWinds] = useState();
  const [long, setLong] = useState();
  const [latitude, setLatitude] = useState();
  const [country, setCountry] = useState();
  const [icons, setIcons] = useState();

  const weatherIconMap = {
    "01d": sun,
    "01n": nightMoon,
    "02d": cloudSun,
    "02n": fewnight,
    "03d": cloudy,
    "03n": cloudy,
    "04d": clouds,
    "04n": clouds,
    "09d": showerRain,
    "09n": showerRain,
    "10d": sunRain,
    "10n": rainNight,
    "11d": thunderstorm,
    "11n": thunderstorm,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist,
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const fetchData = (location) => {
    var data = axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3661345b491ebdaa90e8f3168541e70b`
    );

    data
      .then(function (sucess) {
        setCityname(sucess.data.name);
        setWeather(sucess.data.weather[0].main);
        setHumidity(sucess.data.main.humidity);
        setTemp(sucess.data.main.temp);
        setWinds(sucess.data.wind.speed);
        setLong(sucess.data.coord.lon);
        setLatitude(sucess.data.coord.lat);
        setCountry(sucess.data.sys.country);
        setIcons(sucess.data.weather[0].icon);
        console.log(sucess.data.weather[0].icon);
        console.log(sucess);
      })
      .catch(function (errMsg) {
        console.log(errMsg);
      });
  };
  const handleClick = (event) => {
    event.preventDefault();
    fetchData(input);
  };
  useEffect(() => {
    fetchData("tamilnadu");
  }, []);

  return (
    <div className="w-full h-screen bg-white flex md:items-center justify-center md:p-4">
      <div className="w-full max-w-3xl bg-white md:rounded-lg shadow-lg overflow-auto">
        <div className="p-4 bg-blue-600 text-white text-center md:rounded-t-lg">
          <img
            src={weatherIconMap[icons]}
            alt="weather icon"
            className="w-24 mx-auto"
          />
          <p className="text-lg md:text-xl font-medium text-blue-200">
            {weather}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold mt-2 text-white">
            {cityname},{" "}
            <span className="font-light text-blue-100">{country}</span>
          </h1>
        </div>

        <div className="p-4">
          <form className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              value={input}
              onChange={handleInput}
              className="flex-grow px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300 ease-in-out"
              placeholder="Enter city, state, or country"
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mt-2 md:mt-0 transition-transform duration-300 ease-in-out transform hover:scale-105"
              onClick={handleClick}
            >
              Search
            </button>
          </form>
        </div>

        <div className="p-4 grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-100 rounded-b-lg">
          <div className="flex flex-col items-center text-center">
            <img src={wind} alt="wind icon" className="w-16 md:w-20 mx-auto" />
            <p className="text-lg md:text-xl font-semibold text-blue-700">
              Wind Speed
            </p>
            <p className="text-xl md:text-2xl text-blue-800">{winds} m/s</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src={humidity}
              alt="humidity icon"
              className="w-16 md:w-20 mx-auto"
            />
            <p className="text-lg md:text-xl font-semibold text-blue-700">
              Humidity
            </p>
            <p className="text-xl md:text-2xl text-blue-800">{Humidity}%</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src={temperature}
              alt="temperature icon"
              className="w-16 md:w-20 mx-auto"
            />
            <p className="text-lg md:text-xl font-semibold text-blue-700">
              Temperature
            </p>
            <p className="text-xl md:text-2xl text-blue-800">{temp}°C</p>
          </div>
        </div>

        <div className="p-4 bg-white text-center">
          <p className="font-medium text-lg md:text-xl text-gray-800">
            Latitude:{" "}
            <span className="font-bold text-gray-900">{latitude}</span>
          </p>
          <p className="font-medium text-lg md:text-xl text-gray-800">
            Longitude: <span className="font-bold text-gray-900">{long}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
