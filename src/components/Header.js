import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import '../styles/Header.css';
import profileIcon from '../images/profileIcon.svg';
import SearchIcon from './SearchIcon';
import SearchBar from './SearchBar';
import RecipesContext from '../context/RecipesContext';

function Header({ title }) {
  const { searchBarStatus } = useContext(RecipesContext);
  const history = useHistory();
  const handleClick = (path) => {
    history.push(path);
  };
  return (
    <header>
      <section className="header">
        <div className="invisible">
          <button
            className="btn-header"
            type="button"
            onClick={ () => handleClick('/profile') }
          >
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profileIcon"
              className="svg-icon"
            />
          </button>
        </div>
        <h1 className="page-title" data-testid="page-title">
          {title}
        </h1>
        <div className="invisible">
          {(title === 'Foods'
            || title === 'Explore Nationalities'
            || title === 'Drinks') && <SearchIcon />}
        </div>
      </section>
      { searchBarStatus && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
