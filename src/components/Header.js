import React from 'react';
import { useHistory } from 'react-router';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const history = useHistory();
  const handleClick = (path) => {
    history.push(path);
  };
  return (
    <header className="header">
      <button
        type="button"
        data-testid="profile-top-btn"
        onClick={ () => handleClick('/profile') }
      >
        <img src={ profileIcon } alt="profileIcon" />
      </button>
      <h1 className="page-title" data-testid="page-title">
        Foods
      </h1>
      <button
        type="button"
        data-testid="search-top-btn"
      >
        <img src={ searchIcon } alt="searchIcon" />
      </button>
    </header>
  );
}

export default Header;
