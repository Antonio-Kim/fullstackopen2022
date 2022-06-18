import React, { useState, useEffect } from "react";

import axios from "axios";
import DisplayCountries from "./components/DisplayCountries";

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
