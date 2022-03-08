import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import '../styles/Header.css';
import profileIcon from '../images/profileIcon.svg';
import SearchIcon from './SearchIcon';

function Header(props) {
  const { title } = props;
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
        {title}
      </h1>
      {(title === 'Foods'
        || title === 'Explore Nationalities'
        || title === 'Drinks') && <SearchIcon />}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
