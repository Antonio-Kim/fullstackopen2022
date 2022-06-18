import React, { useState, useEffect } from "react";

import axios from "axios";
const api_key = process.env.REACT_APP_API_KEY;

const DisplayInformation = ({ country }) => {
  const [temperature, setTemperature] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [icon, setIcon] = useState("01d");

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${api_key}`
      )
      .then((response) => {
        setTemperature((response.data.main.temp - 271.15).toFixed(2));
        setSpeed(response.data.wind.speed.toFixed(2));
        setIcon(response.data.weather[0].icon);
      });
  }, []);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language, id) => (
          <li key={id}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt={country.name.common} height={150} />

      <div>
        <h2> Weather in {country.capital}</h2>
        <div>temperature {temperature} Celsius</div>
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="icon"
        />
        <div>wind {speed} m/s</div>
      </div>
    </div>
  );
};

export default DisplayInformation;
