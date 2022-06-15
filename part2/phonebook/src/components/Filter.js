import React from "react";

const Filter = ({ newFilter, handleFilter }) => {
  return (
    <form>
      filter shown with <input value={newFilter} onChange={handleFilter} />
    </form>
  );
};

export default Filter;
