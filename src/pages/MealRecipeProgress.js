import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/FoodDetails.css';
import { useHistory } from 'react-router';
import { getMealDetails } from '../services/API';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import { CLIPBOARD_MESSAGE } from '../data/consts';
import { favoriteStatus, setFavoriteMeal,
  handleCheckbox, handleButton } from '../services/Functions';

function MealInProgress(props) {
  const { match: { params: { id } } } = props;
  const [mealDetails, setMealDetails] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [usedIngredients, setUsedIngredients] = useState([]);
  const [clipboardMessage, setClipBoardMessage] = useState('');
  const [favStatus, setFavStatus] = useState(false);
  const [btnFinishRecipe, setBtnFinishRecipe] = useState(true);
  const history = useHistory();

  const getFromStorage = () => {
    const storageData = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const ingredients = storageData.meals[id];
    setUsedIngredients(ingredients);
  };

  const fromStateToStorage = () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      {
        meals: { [id]: usedIngredients },
      },
    ));
  };

  const checkStorage = () => {
    const getStorageData = localStorage.getItem('inProgressRecipes');
    if (!getStorageData) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        { meals: {}, cocktails: {} },
      ));
    }
    const storageData = localStorage.getItem('inProgressRecipes');
    const getStorageDataParse = JSON.parse(storageData);
    if (!getStorageDataParse.meals[id]) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        { ...getStorageDataParse, meals: { [id]: [] } },
      ));
    }
  };

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

  const copyToClipboard = () => {
    const url = `http://localhost:3000/foods/${id}`;
    navigator.clipboard.writeText(url);
    setClipBoardMessage(CLIPBOARD_MESSAGE);
  };

  useEffect(() => {
    request(id);
    favoriteStatus(id, setFavStatus);
    checkStorage();
    getFromStorage();
  }, []);

  useEffect(() => {
    fromStateToStorage();
    handleButton(recipe,
      usedIngredients, setBtnFinishRecipe);
  }, [usedIngredients]);

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
          <label
            htmlFor={ rec }
            data-testid={ `${i}-ingredient-step` }
            className={ usedIngredients.find((ing) => ing === rec) ? 'isChecked' : '' }
          >
            <input
              type="checkbox"
              key={ i }
              id={ rec }
              name={ rec }
              onChange={ (e) => handleCheckbox(e,
                usedIngredients, setUsedIngredients) }
              checked={ usedIngredients.find((ing) => ing === rec) }
            />
            {rec}
          </label>
        </div>
      ))}
      <p data-testid="instructions">{mealDetails.strInstructions}</p>
      <button
        className="finish-btn"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ btnFinishRecipe }
        onClick={ () => history.push('/done-recipes') }
      >
        Finish Recipe
      </button>
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
