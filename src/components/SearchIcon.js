import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';

function SearchIcon() {
  const { searchBarStatus, setSearchBarStatus } = useContext(RecipesContext);
  const handleClick = () => {
    if (searchBarStatus === false) setSearchBarStatus(true);
    if (searchBarStatus === true) setSearchBarStatus(false);
  };
  return (
    <button
      className="btn-header"
      type="button"
      onClick={ handleClick }
    >
      <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="searchIcon"
        className="svg-icon"
      />
    </button>
  );
}

export default SearchIcon;
