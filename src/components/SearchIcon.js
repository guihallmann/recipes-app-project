import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import searchIcon from '../images/searchIcon.svg';

function SearchIcon() {
  const { searchBarStatus, setSearchBarStatus } = useContext(RecipesContext);
  const handleClick = () => {
    if (searchBarStatus === false) setSearchBarStatus(true);
    if (searchBarStatus === true) setSearchBarStatus(false);
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
