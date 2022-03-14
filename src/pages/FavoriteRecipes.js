import React from 'react';
import CardDoneAndFavoriteRecipes from '../components/CardDoneAndFavoriteRecipes';
import Header from '../components/Header';

function FavoriteRecipes() {
  // const [favoriteRecipes, setFavoriterecipes] = useState([]);
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  // useEffect(() => {
  //   const LSfavoriteRecipes = localStorage.getItem(favoriteRecipes);
  //   const objFavRecipes = JSON.parse(LSfavoriteRecipes);
  //   if (objFavRecipes !== null) setFavoriterecipes(objFavRecipes);
  // }, []);

  // const handleClickFilter = ({ target: { textContent } }) => {
  //   if (textContent === 'All') {
  //     const LSfavoriteRecipes = localStorage.getItem(favoriteRecipes);
  //     const objFavRecipes = JSON.parse(LSfavoriteRecipes);
  //     if (objFavRecipes !== null) setFavoriterecipes(objFavRecipes);
  //   } else {
  //     const filter = favoriteRecipes.filter(({ type }) => type === textContent);
  //     setFavoriterecipes(filter);
  //   }
  // };

  return (
    <section>
      <div>
        <Header title="Favorite Recipes" />
        <button
          type="button"
          data-testid="filter-by-all-btn"
          // onClick={ handleClickFilter }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          // onClick={ handleClickFilter }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          // onClick={ handleClickFilter }
        >
          Drinks
        </button>
        {favorites.map((recipe, index) => (
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
