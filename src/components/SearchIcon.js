import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import searchIcon from '../images/searchIcon.svg';

function SearchIcon() {
  const { status, setStatus } = useContext(RecipesContext);
  const handleClick = () => {
    if (status === false) setStatus(true);
    if (status === true) setStatus(false);
  };
  return (
    <button
      type="button"
      data-testid="search-top-btn"
      onClick={ handleClick }
    >
      <img src={ searchIcon } alt="searchIcon" />
    </button>
  );
}

export default SearchIcon;
