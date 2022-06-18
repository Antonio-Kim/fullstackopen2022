import React, { useState } from "react";

import DisplayInformation from "./DisplayInformation";

const CountryToggle = ({ country }) => {
  const [showInfo, setShowInfo] = useState(false);
  const handleClick = () => setShowInfo(!showInfo);

  return (
    <div>
      {showInfo ? (
        <DisplayInformation country={country} />
      ) : (
        country.name.common
      )}
      <button onClick={handleClick}>{showInfo ? "Unshow" : "Show"}</button>
    </div>
  );
};

export default CountryToggle;
