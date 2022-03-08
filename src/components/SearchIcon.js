import React from 'react';
import searchIcon from '../images/searchIcon.svg';

function SearchIcon() {
  return (
    <button
      type="button"
      data-testid="search-top-btn"
    >
      <img src={ searchIcon } alt="searchIcon" />
    </button>
  );
}

export default SearchIcon;
