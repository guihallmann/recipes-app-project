import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';

function Card({ index, image, name }) {
  return (
    <div data-testid={ `${index}-recipe-card` } className="card-recipe">
      <img
        src={ image }
        alt="recipe-card"
        data-testid={ `${index}-card-img` }
        className="img-card"
      />
      <h3 data-testid={ `${index}-card-name` } className="card-recipe-name">{name}</h3>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Card;
