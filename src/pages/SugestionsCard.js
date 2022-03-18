import React from 'react';
import PropTypes from 'prop-types';

function SugestionCard({ index, image, name }) {
  return (
    <div className="div-card-recommended" data-testid={ `${index}-recomendation-card` }>
      <h1
        className="name-card-recommended"
        data-testid={ `${index}-recomendation-title` }
      >
        {name}
      </h1>
      <img
        className="card-recommended"
        data-testid={ `${index}-card-img` }
        src={ image }
        alt="recomendation-card"
      />

    </div>
  );
}

SugestionCard.propTypes = {
  index: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SugestionCard;

// testando push
// push novamente
