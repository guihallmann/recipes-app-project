import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function CardDoneAndFavoriteRecipes({ recipe, index, favorite }) {
  const {
    image,
    category,
    name,
    doneDate,
    tags,
    type,
    nationality,
    id,
    alcoholicOrNot,
  } = recipe;
  const [filterTags, setFilterTags] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  useEffect(() => {
    const storageFavorites = localStorage.getItem('favoriteRecipes');
    const favoritesParse = JSON.parse(storageFavorites);
    setFavoriteRecipes(favoritesParse);
  }, []);
  const handleClickUnfavorite = () => { // verificar se atualiza a tela
    const newFavoriteRecipes = favoriteRecipes
      .filter((favRecipe) => favRecipe.id !== recipe.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setFavoriteRecipes(newFavoriteRecipes);
  };
  if (tags) {
    setFilterTags(tags.filter((tag, ind) => ind < 2));
  }
  const [copiedLink, setCopiedLink] = useState(false);

  const handleClickShare = () => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopiedLink(true);
  };
  return (
    <div>
      {console.log(favoriteRecipes)}
      <Link to={ `${type}s/${id}` }>
        <img
          src={ image }
          alt="recipe"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <Link to={ `/${type}s/${id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {
          type === 'food' ? `${nationality} - ${category}` : alcoholicOrNot
        }
      </p>
      <button
        type="button"
        onClick={ handleClickShare }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="shareIcon"
        />
      </button>
      {copiedLink && <p>Link copied!</p>}
      {favorite && (
        <button
          type="button"
          onClick={ () => handleClickUnfavorite() }
        >
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            alt="blackHeartIcon"
          />
        </button>
      )}
      {!favorite && <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>}
      {!favorite && filterTags.map((tagName) => (
        <p
          data-testid={ `${index}-${tagName}-horizontal-tag` }
          key={ tagName }
        >
          {tagName}
        </p>))}
    </div>
  );
}

CardDoneAndFavoriteRecipes.propTypes = {
  image: PropTypes.string,
  category: PropTypes.string,
  name: PropTypes.string,
  doneDate: PropTypes.string,
  tags: PropTypes.shape,
}.isRequired;

export default CardDoneAndFavoriteRecipes;
