import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/DrinkDetails.css';
import { useHistory } from 'react-router';
import { getDrinkDetails } from '../services/API';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import { CLIPBOARD_MESSAGE } from '../data/consts';
import { favoriteStatus, setFavoriteDrink } from '../services/Functions';

function DrinkRecipeProgress(props) {
  const { match: { params: { id } } } = props;
  const [drinkDetails, setDrinkDetails] = useState([]);
  const [recipe, setRecipe] = useState([]);
  // const [foodData, setFoodData] = useState([]);
  // const [btnStatus, setBtnStatus] = useState('newRecipe');
  const [clipboardMessage, setClipBoardMessage] = useState('');
  const [favStatus, setFavStatus] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;
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
  // const data = async () => {
  //   const dataResult = await getMealsRecommends();
  //   setFoodData(dataResult);
  // };
  // const startRecipe = () => {
  //   history.push(`/drinks/${id}/in-progress`);
  // };

  const copyToClipboard = () => {
    const url = `http://localhost:3000${pathname}/in-progress`;
    navigator.clipboard.writeText(url);
    setClipBoardMessage(CLIPBOARD_MESSAGE);
  };
  useEffect(() => {
    request(id);
    // data();
    // recipeStatus(id, 'cocktails', setBtnStatus);
    favoriteStatus(id, setFavStatus);
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
        <button type="button" onClick={ copyToClipboard }>
          <img src={ shareIcon } alt="shareIcon" data-testid="share-btn" />
        </button>
        <button
          type="button"
          onClick={ () => setFavoriteDrink(favStatus, setFavStatus, drinkDetails) }
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
          <span
            data-testid={ `${i}-ingredient-step` }
            key={ i }
          >
            {rec}
          </span>
        </div>
      ))}
      <p data-testid="instructions">{drinkDetails.strInstructions}</p>

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

DrinkRecipeProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default DrinkRecipeProgress;
