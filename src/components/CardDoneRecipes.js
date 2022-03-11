import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function CardDoneRecipes({ image, category, name, doneDate, tags }, index) {
  return (
    <div>
      <img src={ image } alt="recipe" data-testid={ `${index}-horizontal-image` } />
      <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>
      <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
      <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
      <span data-testid={ `${index}-horizontal-share-btn` }>{shareIcon}</span>
      {/* trocar tag */}
      {tags.map((tagName) => (
        <p
          data-testid={ `${index}-${tagName}-horizontal-tag` }
          key={ tagName }
        >
          {tagName}
        </p>))}
    </div>
  );
}

CardDoneRecipes.propTypes = {
  image: PropTypes.string,
  category: PropTypes.string,
  name: PropTypes.string,
  doneDate: PropTypes.string,
  tags: PropTypes.shape,
}.isRequired;

export default CardDoneRecipes;
