import React from "react";
import { useState, useEffect } from "react";
import Notification from "./Notification";
import axios from "axios";

const FilteredCountries = ({ filteredCountries }) => {
  const APIKey = "77f71a41ec8ed6130b8f6dd8cb9b8e10";
  const [selected, setSelected] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSelected(filteredCountries[0]);
    }
  }, [filteredCountries]);

  useEffect(() => {
    if (selected) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${selected.capital[0]}&appid=${APIKey}`
        )
        .then((res) => {
          setWeather(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [APIKey, selected]);

  const showSelected = (countryName) => {
    setSelected(
      filteredCountries.filter(
        (country) => country.name.common === countryName
      )[0]
    );
  };

  return (
    <div>
      {filteredCountries.length > 10 ? (
        <p> Too many matches,specify other filters</p>
      ) : (
        filteredCountries.map((country, index) => (
          <div key={index}>
            {country.name.common}
            <button onClick={() => showSelected(country.name.common)}>
              show
            </button>
          </div>
        ))
      )}
      {selected ? (
        <div>
          <h1>{selected.name.common}</h1>
          <p>capital: {selected.capital[0]}</p>
          <p>area: {selected.area}</p>
          <h3>languages</h3>
          {Object.values(selected.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
          <img
            src={selected.flags.png}
            alt={selected.flags.alt}
            style={{ marginTop: "20px" }}
          />
          <h3>Weather in {selected.name.common}</h3>
          {weather && weather.name === selected.capital[0] ? (
            <div>
              <p>Temperature {parseInt(weather.main.temp - 273.15)}°C</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={`weather ${weather.name}`}
              />
              <p>Wind speed {weather.wind.speed} m/s</p>
            </div>
          ) : (
            <Notification message="weather details not availble" />
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FilteredCountries;
