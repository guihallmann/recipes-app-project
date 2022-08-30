import React, { useEffect, useState, useContext } from 'react';
import CardDoneAndFavoriteRecipes from '../components/CardDoneAndFavoriteRecipes';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import '../styles/Done.css';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const { setSearchBarStatus } = useContext(RecipesContext);
  useEffect(() => {
    setSearchBarStatus(false);
    const LSdoneRecipes = localStorage.getItem('doneRecipes');
    const objDoneRecipes = JSON.parse(LSdoneRecipes);
    if (objDoneRecipes !== null) setDoneRecipes(objDoneRecipes);
  }, []);

  const handleClickFilter = ({ target: { textContent } }) => {
    const LSdoneRecipes = localStorage.getItem('doneRecipes');
    let objDoneRecipes = JSON.parse(LSdoneRecipes);
    if (objDoneRecipes === null) objDoneRecipes = [];
    if (textContent === 'All') {
      setDoneRecipes(objDoneRecipes);
    } else if (textContent === 'Drinks') {
      const filter = objDoneRecipes.filter(({ type }) => type === 'drink');
      setDoneRecipes(filter);
    } else if (textContent === 'Food') {
      const filter = objDoneRecipes.filter(({ type }) => type === 'food');
      setDoneRecipes(filter);
    }
  };

  return (
    <section>
      <section>
        <Header title="Done Recipes" />
        <section className="done-buttons">
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
        {doneRecipes && doneRecipes.map((recipe, index) => (
          <CardDoneAndFavoriteRecipes
            recipe={ recipe }
            index={ index }
            favorite={ false }
            key={ recipe.id }
          />))}
      </section>
    </section>
  );
}

export default DoneRecipes;
