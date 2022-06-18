import React from "react";

import DisplayInformation from "./DisplayInformation";
import CountryToggle from "./CountryToggle";

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

export default DisplayCountries;
