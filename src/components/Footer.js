import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/drinks">
        <img
          className="footer-logo"
          src={ drinkIcon }
          alt="bebida"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explore">
        <img
          className="footer-logo"
          src={ exploreIcon }
          alt="explorar"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/foods">
        <img
          className="footer-logo"
          src={ mealIcon }
          alt="carnes"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
