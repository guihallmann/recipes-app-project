import React, { useContext, useState, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import CardDoneAndFavoriteRecipes from '../components/CardDoneAndFavoriteRecipes';
import Header from '../components/Header';
import '../styles/FavoriteRecipe.css';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriterecipes] = useState([]);
  const { changeList } = useContext(RecipesContext);

  useEffect(() => {
    setFavoriterecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, [changeList]);

  const handleClickFilter = ({ target: { textContent } }) => {
    const LSfavoriteRecipes = localStorage.getItem('favoriteRecipes');
    const parseFavRecipes = JSON.parse(LSfavoriteRecipes);
    if (textContent === 'All') {
      setFavoriterecipes(parseFavRecipes);
    } else if (textContent === 'Drinks') {
      const filter = parseFavRecipes.filter(({ type }) => type === 'drink');
      setFavoriterecipes(filter);
    } else if (textContent === 'Food') {
      const filter = parseFavRecipes.filter(({ type }) => type === 'food');
      setFavoriterecipes(filter);
    }
  };

  return (
    <section>
      <div>
        <Header title="Favorite Recipes" />
        <section className="filters">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ handleClickFilter }
            className="filter-btn"
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ handleClickFilter }
            className="filter-btn"
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ handleClickFilter }
            className="filter-btn"
          >
            Drinks
          </button>
        </section>
        {favoriteRecipes && favoriteRecipes.map((recipe, index) => (
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
