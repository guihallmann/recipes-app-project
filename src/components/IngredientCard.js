import React from 'react';
import PropTypes from 'prop-types';

function IngredientCard({ index, image, name }) {
  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <img
        src={ image }
        alt={ `ingredient-card-${index}` }
        data-testid={ `${index}-card-img` }
      />
      <span data-testid={ `${index}-card-name` }>{name}</span>
    </div>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default IngredientCard;
