import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function CardDoneRecipes({
  image,
  category,
  name,
  doneDate,
  tags,
  type,
  nationality,
  id,
}, index) {
  tags = tags.filter((tag, ind) => ind < 2);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleClickShare = () => {
    copy(`/${type}/${id}`);/* vericar se o type e food ou foods */
    setCopiedLink(true);
  };
  return (
    <div>
      <Link to={ `/${type}/${id}` }>
        <img src={ image } alt="recipe" data-testid={ `${index}-horizontal-image` } />
      </Link>
      <Link to={ `/${type}/${id}` }>
        <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {
          type === 'food' ? `${nationality} - ${category}` : alcoholicOrNot
        }
        {/* vericar se o type e food ou foods */}
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
      <button
        data-testid={ `${index}-horizontal-share-btn` }
        type="button"
        onClick={ handleClickShare }
      >
        {shareIcon}
      </button>
      {copiedLink && <p>Link copied!</p>}
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
