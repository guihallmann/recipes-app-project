import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/FoodDetails.css';
import { useHistory } from 'react-router';
import { getMealDetails, getDrinksRecommends } from '../services/API';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import SugestionCard from './SugestionsCard';
import { FIRST_SIX, CLIPBOARD_MESSAGE } from '../data/consts';
import { recipeStatus, favoriteStatus, setFavoriteMeal } from '../services/Functions';

function FoodDetails(props) {
  const { match: { params: { id } } } = props;
  const [mealDetails, setMealDetails] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [drinkData, setDrinkData] = useState([]);
  const [btnStatus, setBtnStatus] = useState('newRecipe');
  const [clipboardMessage, setClipBoardMessage] = useState('');
  const [favStatus, setFavStatus] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;
  const request = async (mealId) => {
    const apiResult = await getMealDetails(mealId);
    setMealDetails(apiResult.meals[0]);
    const entriesArr = Object.entries(apiResult.meals[0]);
    const ingredients = entriesArr.filter((elem) => elem[0].includes('strIngredient'))
      .filter((ing) => ing[1] !== '' && ing[1] !== null)
      .map((ing) => ing[1]);
    const measures = entriesArr.filter((elem) => elem[0].includes('strMeasure'))
      .filter((mea) => mea[1] !== ' ' && mea[1] !== null && mea[1] !== '')
      .map((mea) => mea[1]);
    const SIZE = ingredients.length;
    const ARRAY = [];
    for (let i = 0; i < SIZE; i += 1) {
      ARRAY.push(`${ingredients[i]} - ${measures[i]}`);
    }
    setRecipe(ARRAY);
  };
  const data = async () => {
    const dataResult = await getDrinksRecommends();
    setDrinkData(dataResult);
  };
  const startRecipe = () => {
    history.push(`/foods/${id}/in-progress`);
  };
  const copyToClipboard = () => {
    const url = `http://localhost:3000${pathname}`;
    navigator.clipboard.writeText(url);
    setClipBoardMessage(CLIPBOARD_MESSAGE);
  };
  useEffect(() => {
    request(id);
    data();
    recipeStatus(id, 'meals', setBtnStatus);
    favoriteStatus(id, setFavStatus);
  }, []);
  return (
    <section>
      <img
        data-testid="recipe-photo"
        className="img-size1"
        src={ mealDetails.strMealThumb }
        alt={ `${mealDetails.strMeal}` }
      />
      <h1 className="name-food" data-testid="recipe-title">{mealDetails.strMeal}</h1>
      <h3 className="type-food" data-testid="recipe-category">
        {mealDetails.strCategory}
      </h3>
      <section>
        <button
          className="button-share-favorite"
          type="button"
          onClick={ copyToClipboard }
        >
          <img
            className="svg-icon"
            src={ shareIcon }
            alt="shareIcon"
            data-testid="share-btn"
          />
        </button>
        <button
          className="button-share-favorite"
          type="button"
          onClick={ () => setFavoriteMeal(favStatus, setFavStatus, mealDetails) }
        >
          <img
            src={ favStatus ? blackHeart : whiteHeart }
            alt="favIcon"
            data-testid="favorite-btn"
            className="svg-icon"
          />
        </button>
      </section>
      {clipboardMessage === CLIPBOARD_MESSAGE
      && (
        <span
          className="clip-message"
        >
          {CLIPBOARD_MESSAGE}
        </span>
      )}
      <h3 className="h3-ingredients">Ingredients</h3>
      <section className="ingredients-section">
        {recipe.length !== 0 && recipe.map((rec, i) => (
          <div className="container-ingredients" key={ i }>
            <span
              data-testid={ `${i}-ingredient-name-and-measure` }
              key={ i }
            >
              { rec.includes('undefined') ? rec.split('-')[0] : rec }
            </span>
          </div>
        ))}
      </section>
      <h3 className="h3-instructions">Instructions</h3>
      <section className="container-instructions">
        <p
          className="instructions"
          data-testid="instructions"
        >
          { mealDetails.strInstructions }
        </p>
      </section>
      {mealDetails.strYoutube !== undefined && (
        <>
          <h3 className="h3-video">Video</h3>
          <section className="video-section">
            <iframe className="video" data-testid="video" title="recipe-video" src={ `https://www.youtube.com/embed/${mealDetails.strYoutube.split('=')[1]}` } />
          </section>
        </>)}
      <h3 className="h3-recommends">Recomendation</h3>
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
      <section className="start-btn-section">
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
            onClick={ startRecipe }
          >
            Continue Recipe
          </button>)}
      </section>
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
