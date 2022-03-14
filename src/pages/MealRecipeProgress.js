import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/FoodDetails.css';
import { useHistory } from 'react-router';
import { getMealDetails } from '../services/API';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
// import SugestionCard from './SugestionsCard';
import { CLIPBOARD_MESSAGE } from '../data/consts';
import { favoriteStatus, setFavoriteMeal } from '../services/Functions';

function MealInProgress(props) {
  const { match: { params: { id } } } = props;
  const [mealDetails, setMealDetails] = useState([]);
  const [recipe, setRecipe] = useState([]);
  // const [drinkData, setDrinkData] = useState([]);
  // const [btnStatus, setBtnStatus] = useState('newRecipe');
  const [clipboardMessage, setClipBoardMessage] = useState('');
  const [favStatus, setFavStatus] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;
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
  // const data = async () => {
  //   const dataResult = await getDrinksRecommends();
  //   setDrinkData(dataResult);
  // };
  // const startRecipe = () => {
  //   history.push(`/foods/${id}/in-progress`);
  // };
  const copyToClipboard = () => {
    const url = `http://localhost:3000${pathname}/in-progress`;
    navigator.clipboard.writeText(url);
    setClipBoardMessage(CLIPBOARD_MESSAGE);
  };

  const handleCheckbox = ({ target }) => {
    target.parentElement.classList.toggle('isChecked');
  };

  useEffect(() => {
    request(id);
    // data();
    // recipeStatus(id, 'meals', setBtnStatus);
    favoriteStatus(id, setFavStatus);
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
        <button type="button" onClick={ copyToClipboard }>
          <img src={ shareIcon } alt="shareIcon" data-testid="share-btn" />
        </button>
        <button
          type="button"
          onClick={ () => setFavoriteMeal(favStatus, setFavStatus, mealDetails) }
        >
          <img
            src={ favStatus ? blackHeart : whiteHeart }
            alt="favIcon"
            data-testid="favorite-btn"
          />
        </button>
      </section>
      {clipboardMessage === CLIPBOARD_MESSAGE && <span>{CLIPBOARD_MESSAGE}</span>}
      {recipe.length !== 0 && recipe.map((rec, i) => (
        <div key={ i }>
          <label htmlFor={ rec } data-testid={ `${i}-ingredient-step` }>
            <input
              type="checkbox"
              key={ i }
              id={ rec }
              onClick={ handleCheckbox }
            />
            {rec}
          </label>
        </div>
      ))}
      <p data-testid="instructions">{mealDetails.strInstructions}</p>
      {/* {mealDetails.strYoutube !== undefined && <iframe data-testid="video" title="recipe-video" src={ `https://www.youtube.com/embed/${mealDetails.strYoutube.split('=')[1]}` } /> }
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
      </section> */}

      <button
        className="start-btn"
        type="button"
        data-testid="finish-recipe-btn"
      // onClick={ startRecipe }
      >
        Finish Recipe
      </button>
      {/* {btnStatus === 'inProgressRecipe'
        && (
          <button
            className="start-btn"
            type="button"
            data-testid="start-recipe-btn"
          >
            Continue Recipe
          </button>)} */}
    </section>
  );
}

MealInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default MealInProgress;
