import React from 'react';
import PropTypes from 'prop-types';

function SugestionCard({ index, image, name }) {
  return (
    <div data-testid={ `${index}-recomendation-card` }>
      <h1 data-testid={ `${index}-recomendation-title` }>{name}</h1>
      <img data-testid={ `${index}-card-img` } src={ image } alt="recomendation-card" />
    </div>
  );
}

SugestionCard.propTypes = {
  index: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SugestionCard;
