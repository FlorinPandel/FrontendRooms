// components/Filter.js
import React from 'react';

function Filter({ filter, setFilter }) {
  return (
    <div>
      <label htmlFor="filter">Filter nach Bundesland:</label>
      <input
        type="text"
        id="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Bundesland eingeben"
      />
    </div>
  );
}

export default Filter;
