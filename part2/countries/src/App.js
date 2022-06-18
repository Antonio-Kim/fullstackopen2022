import React, { useState, useEffect } from "react";

import axios from "axios";

const DisplayInformation = ({ country }) => {
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
    </div>
  );
};

const CountryToggle = ({ country }) => {
  const [showInfo, setShowInfo] = useState(false);
  const handleClick = () => setShowInfo(!showInfo);

  return (
    <div>
      {showInfo ? <DisplayInformation country={country}/> : country.name.common}
      <button onClick={handleClick}>{showInfo ? "Unshow" : "Show"}</button>
    </div>
  );
};

const DisplayCountries = ({ countries }) => {
  if (countries.length > 10) {
    return "Too many countries";
  } else if (countries.length === 1) {
    return (
      <div>
        <DisplayInformation country={countries[0]} />
      </div>
    );
  } else {
    return countries.map((country, id) => {
      return <CountryToggle key={id} country={country} />;
    });
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchedCountries, setSearchedCountries] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleFilterCountries = (event) => {
    setSearchedCountries(event.target.value);
  };

  const filter = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchedCountries.toLowerCase())
  );

  return (
    <div>
      <form>
        find countries{" "}
        <input value={searchedCountries} onChange={handleFilterCountries} />
      </form>
      <DisplayCountries countries={filter} />
    </div>
  );
};

export default App;
