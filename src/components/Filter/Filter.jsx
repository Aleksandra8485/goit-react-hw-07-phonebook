import React from 'react';

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <input
      type="text"
      placeholder="Search contacts..."
      value={filter}
      onChange={handleFilterChange}
    />
  );
};

export default Filter;
