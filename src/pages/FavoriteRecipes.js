import React, { useEffect, useState } from 'react';
import CardDoneAndFavoriteRecipes from '../components/CardDoneAndFavoriteRecipes';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriterecipes] = useState([]);
  useEffect(() => {
    const LSfavoriteRecipes = localStorage.getItem(favoriteRecipes);
    setFavoriterecipes(JSON.parse(LSfavoriteRecipes));
  }, []);

  const handleClickFilter = ({ target: { textContent } }) => {
    if (textContent === 'All') {
      const LSfavoriteRecipes = localStorage.getItem(favoriteRecipes);
      setFavoriterecipes(JSON.parse(LSfavoriteRecipes));
    } else {
      const filter = favoriteRecipes.filter(({ type }) => type === textContent);
      setFavoriterecipes(filter);// muda aq
    }
  };

  return (
    <section>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleClickFilter }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleClickFilter }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleClickFilter }
        >
          Drinks
        </button>
        {favoriteRecipes.map((recipe, index) => (
          <CardDoneAndFavoriteRecipes
            recipe={ recipe }
            index={ index }
            favorite
            key={ recipe.id }
          />))}
      </div>
    </section>
  );
}

export default FavoriteRecipes;
