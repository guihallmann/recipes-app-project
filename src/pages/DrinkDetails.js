import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/DrinkDetails.css';
import { useHistory } from 'react-router';
import { getDrinkDetails, getMealsRecommends } from '../services/API';
import SugestionCard from './SugestionsCard';
import shareIcon from '../images/shareIcon.svg';
import favIcon from '../images/blackHeartIcon.svg';
import { FIRST_SIX } from '../data/consts';

function DrinkDetails(props) {
  const { match: { params: { id } } } = props;
  const [drinkDetails, setDrinkDetails] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [btnStatus, setBtnStatus] = useState('newRecipe');
  const history = useHistory();
  const request = async (drinkId) => {
    const apiResult = await getDrinkDetails(drinkId);
    setDrinkDetails(apiResult.drinks[0]);
    const entriesArr = Object.entries(apiResult.drinks[0]);
    const newArr = entriesArr.filter((pos) => pos[0].includes('strIngredient')
      || pos[0].includes('strMeasure'))
      .filter((pos) => pos[1] !== '' && pos[1] !== null)
      .map((pos) => pos[1]);
    const SIZE = (newArr.length) / 2;
    const ingredients = newArr.map((pos, i) => i < SIZE && pos)
      .filter((pos) => pos !== false);
    const measures = newArr.map((pos, i) => i >= SIZE && pos)
      .filter((pos) => pos !== false);
    const array = ingredients.map((elem, index) => `${elem} - ${measures[index]}`);
    setRecipe(array);
  };
  const data = async () => {
    const dataResult = await getMealsRecommends();
    setFoodData(dataResult);
  };
  const recipeStatus = () => {
    const doneRecipes = localStorage.getItem('doneRecipes');
    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (doneRecipes) {
      const doneRecipesParse = JSON.parse(doneRecipes);
      const getRecipe = doneRecipesParse.find((rec) => rec.id === id);
      if (getRecipe !== undefined) setBtnStatus('doneRecipe');
    }
    if (inProgressRecipes) {
      const inProgressRecipesParse = JSON.parse(inProgressRecipes);
      const getProgress = Object.keys(inProgressRecipesParse.cocktails)
        .find((rec) => rec === id);
      if (getProgress !== undefined) setBtnStatus('inProgressRecipe');
    }
  };
  const startRecipe = () => {
    history.push(`/drinks/${id}/in-progress`);
  };
  useEffect(() => {
    request(id);
    data();
    recipeStatus();
  }, []);

  return (
    <section>
      <img
        data-testid="recipe-photo"
        className="mealImg"
        src={ drinkDetails.strDrinkThumb }
        alt={ `${drinkDetails.strDrink}` }
      />
      <h1 data-testid="recipe-title">{drinkDetails.strDrink}</h1>
      <h2 data-testid="recipe-category">{drinkDetails.strAlcoholic}</h2>
      <section>
        <button type="button">
          <img src={ shareIcon } alt="shareIcon" data-testid="share-btn" />
        </button>
        <button type="button">
          <img src={ favIcon } alt="favIcon" data-testid="favorite-btn" />
        </button>
      </section>
      {recipe.length !== 0 && recipe.map((rec, i) => (
        <div key={ i }>
          <span
            data-testid={ `${i}-ingredient-name-and-measure` }
            key={ i }
          >
            { rec }
          </span>
        </div>
      ))}
      <p data-testid="instructions">{drinkDetails.strInstructions}</p>
      {drinkDetails.strYoutube !== undefined && <iframe data-testid="video" title="recipe-video" src={ `https://www.youtube.com/embed/${mealDetails.strYoutube.split('=')[1]}` } /> }
      <section className="carousel">
        {foodData.length !== 0 && foodData.map((rec, i) => (i <= FIRST_SIX
          && (
            <SugestionCard
              key={ rec.idMeal }
              index={ i }
              name={ rec.strMeal }
              image={ rec.strMealThumb }
            />)
        ))}
      </section>
      {btnStatus === 'newRecipe'
      && (
        <button
          className="start-btn"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ startRecipe }
        >
          Start Recipe
        </button>)}
      {btnStatus === 'inProgressRecipe'
      && (
        <button
          className="start-btn"
          type="button"
          data-testid="start-recipe-btn"
        >
          Continue Recipe
        </button>)}
    </section>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default DrinkDetails;
