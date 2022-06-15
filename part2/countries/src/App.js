import React, { useState, useEffect } from "react";
import axios from "axios";

const Information = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>

      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li>{language}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt={country.name.common} height={200} />
    </div>
  );
};

const Country = ({ countries }) => {
  if (countries.length > 10) {
    return "Too many countries";
  } else if (countries.length === 1) {
    return <Information country={countries[0]} />;
  } else {
    return countries.map((country) => <div>{country.name.common}</div>);
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleFilteredCountries = (event) => {
    setFilteredCountries(event.target.value);
  };

  const filter = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filteredCountries.toLowerCase())
  );

  return (
    <div>
      <form>
        find countries{" "}
        <input value={filteredCountries} onChange={handleFilteredCountries} />
      </form>
      <Country countries={filter} />
    </div>
  );
};

export default App;
