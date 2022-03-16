import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/DrinkRecipeProgress.css';
import { useHistory } from 'react-router';
import { getDrinkDetails } from '../services/API';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import { CLIPBOARD_MESSAGE } from '../data/consts';
import { favoriteStatus,
  setFavoriteDrink, handleCheckbox, handleButton,
  handleClickFinishRecipe } from '../services/Functions';

function DrinkRecipeProgress(props) {
  const { match: { params: { id } } } = props;
  const [drinkDetails, setDrinkDetails] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [usedIngredients, setUsedIngredients] = useState([]);
  // const [foodData, setFoodData] = useState([]);
  const [btnFinishRecipe, setBtnFinishRecipe] = useState(false);
  const [clipboardMessage, setClipBoardMessage] = useState('');
  const [favStatus, setFavStatus] = useState(false);

  const getFromStorage = () => {
    const storageData = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const ingredients = storageData.cocktails[id];
    setUsedIngredients(ingredients);
  };

  const fromStateToStorage = () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      {
        cocktails: { [id]: usedIngredients },
      },
    ));
  };

  // const handleButton = () => {
  //   if (recipe.length === usedIngredients.length) {
  //     setBtnFinishRecipe(false);
  //   } else { setBtnFinishRecipe(true); }
  //   console.log('recipe', recipe.length);
  //   console.log('ingredients', usedIngredients.length);
  //   console.log(btnFinishRecipe);
  // };

  const checkStorage = () => {
    const getStorageData = localStorage.getItem('inProgressRecipes');
    if (!getStorageData) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        { meals: {}, cocktails: {} },
      ));
    }
    const storageData = localStorage.getItem('inProgressRecipes');
    const getStorageDataParse = JSON.parse(storageData);
    if (!getStorageDataParse.cocktails[id]) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        { ...getStorageDataParse, cocktails: { [id]: [] } },
      ));
    }
  };

  const history = useHistory();
  // const { pathname } = history.location;
  const request = async (drinkId) => {
    const apiResult = await getDrinkDetails(drinkId);
    setDrinkDetails(apiResult.drinks[0]);
    const entriesArr = Object.entries(apiResult.drinks[0]);
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
    const url = `http://localhost:3000/drinks/${id}`;
    navigator.clipboard.writeText(url);
    setClipBoardMessage(CLIPBOARD_MESSAGE);
  };

  // const data = async () => {
  //   const dataResult = await getMealsRecommends();
  //   setFoodData(dataResult);
  // };
  // const startRecipe = () => {
  //   history.push(`/drinks/${id}/in-progress`);
  // };

  useEffect(() => {
    request(id);
    // data();
    // recipeStatus(id, 'cocktails', setBtnStatus);
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
      <p data-testid="instructions">{drinkDetails.strInstructions}</p>

      <button
        className="finish-btn"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ btnFinishRecipe }
        onClick={ () => handleClickFinishRecipe(history, drinkDetails, 'bebida') }
      >
        Finish Recipe
      </button>
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
