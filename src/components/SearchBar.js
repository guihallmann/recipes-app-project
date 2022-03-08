import React from 'react';

function SearchBar() {
  return (
    <input
      placeholder="Search Recipe"
      className="search-input"
      type="text"
      data-testid="search-input"
    />
  );
}

export default SearchBar;
