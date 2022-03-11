import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/FoodDetails.css';
import { getMealDetails, getDrinksRecommends } from '../services/API';
import shareIcon from '../images/shareIcon.svg';
import favIcon from '../images/blackHeartIcon.svg';
import SugestionCard from './SugestionsCard';
import { FIRST_SIX } from '../data/consts';

function FoodDetails(props) {
  const { match: { params: { id } } } = props;
  const [mealDetails, setMealDetails] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [drinkData, setDrinkData] = useState([]);
  const [btnStatus, setBtnStatus] = useState(true);
  const request = async (mealId) => {
    const apiResult = await getMealDetails(mealId);
    setMealDetails(apiResult.meals[0]);
    const entriesArr = Object.entries(apiResult.meals[0]);
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
    const dataResult = await getDrinksRecommends();
    setDrinkData(dataResult);
  };
  const recipeStatus = () => {
    const doneRecipes = localStorage.getItem('doneRecipes');
    if (doneRecipes) {
      const doneRecipesParse = JSON.parse(doneRecipes);
      const getRecipe = doneRecipesParse.find((rec) => rec.id === id);
      if (getRecipe !== undefined) setBtnStatus(false);
    }
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
        src={ mealDetails.strMealThumb }
        alt={ `${mealDetails.strMeal}` }
      />
      <h1 data-testid="recipe-title">{mealDetails.strMeal}</h1>
      <h2 data-testid="recipe-category">{mealDetails.strCategory}</h2>
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
      <p data-testid="instructions">{mealDetails.strInstructions}</p>
      {mealDetails.strYoutube !== undefined && <iframe data-testid="video" title="recipe-video" src={ `https://www.youtube.com/embed/${mealDetails.strYoutube.split('=')[1]}` } /> }
      <section className="carousel">
        {drinkData.length !== 0 && drinkData.map((rec, i) => (i <= FIRST_SIX
      && (
        <SugestionCard
          key={ rec.idDrink }
          index={ i }
          name={ rec.strDrink }
          image={ rec.strDrinkThumb }
        />)
        ))}
      </section>
      {btnStatus
      && (
        <button
          className="start-btn"
          type="button"
          data-testid="start-recipe-btn"
        >
          Start Recipe
        </button>)}
    </section>
  );
}
FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default FoodDetails;
