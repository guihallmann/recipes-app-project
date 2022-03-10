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
      onClick={ handleClick }
    >
      <img data-testid="search-top-btn" src={ searchIcon } alt="searchIcon" />
    </button>
  );
}

export default SearchIcon;
