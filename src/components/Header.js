import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import '../styles/Header.css';
import profileIcon from '../images/profileIcon.svg';
import SearchIcon from './SearchIcon';
import SearchBar from './SearchBar';
import RecipesContext from '../context/RecipesContext';

function Header(props) {
  const { title } = props;
  const { status } = useContext(RecipesContext);
  const history = useHistory();
  const handleClick = (path) => {
    history.push(path);
  };
  return (
    <header>
      <section className="header">
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
      </section>
      <section className="search-filter">
        { status && <SearchBar />}
      </section>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
