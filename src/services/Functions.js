export const recipeStatus = (id, type, setBtnStatus) => {
  const doneRecipes = localStorage.getItem('doneRecipes');
  const inProgressRecipes = localStorage.getItem('inProgressRecipes');
  if (doneRecipes) {
    const doneRecipesParse = JSON.parse(doneRecipes);
    const getRecipe = doneRecipesParse.find((rec) => rec.id === id);
    if (getRecipe !== undefined) setBtnStatus(false);
  }
  if (inProgressRecipes) {
    const inProgressRecipesParse = JSON.parse(inProgressRecipes);
    const getProgress = Object.keys(inProgressRecipesParse[type])
      .find((rec) => rec === id);
    if (getProgress !== undefined) setBtnStatus('inProgressRecipe');
  }
};

export const favoriteStatus = (id, setFavStatus) => {
  const favRecipes = localStorage.getItem('favoriteRecipes');
  if (!favRecipes) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    setFavStatus(false);
  }
  if (favRecipes) {
    const favRecipesParse = JSON.parse(favRecipes);
    const getFav = favRecipesParse.find((fav) => fav.id === id);
    if (getFav !== undefined) setFavStatus(true);
  }
};

export const setFavoriteMeal = (favStatus, setFavStatus, mealDetails) => {
  const favRecipes = localStorage.getItem('favoriteRecipes');
  const favRecipesParse = JSON.parse(favRecipes);

  if (!favStatus) {
    const MealFavList = [...favRecipesParse, {
      id: mealDetails.idMeal,
      type: 'food',
      nationality: mealDetails.strArea,
      category: mealDetails.strCategory,
      alcoholicOrNot: '',
      name: mealDetails.strMeal,
      image: mealDetails.strMealThumb,
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(MealFavList));
    setFavStatus(true);
  }
  if (favStatus) {
    /* const favRecipesParse = JSON.parse(favRecipes); */
    const removeFav = favRecipesParse.filter((fav) => fav.id !== mealDetails.idMeal);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFav));
    setFavStatus(false);
  }
};

export const setFavoriteDrink = (favStatus, setFavStatus, drinkDetails) => {
  const favRecipes = localStorage.getItem('favoriteRecipes');
  const favDrinksParse = JSON.parse(favRecipes);
  if (!favStatus) {
    const DrinkFavList = [...favDrinksParse, {
      id: drinkDetails.idDrink,
      type: 'drink',
      nationality: '',
      category: drinkDetails.strCategory,
      alcoholicOrNot: drinkDetails.strAlcoholic,
      name: drinkDetails.strDrink,
      image: drinkDetails.strDrinkThumb,
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(DrinkFavList));
    setFavStatus(true);
  }
  if (favStatus) {
    // const favRecipesParse = JSON.parse(favRecipes);
    const removeFav = favDrinksParse.filter((fav) => fav.id !== drinkDetails.idDrink);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFav));
    setFavStatus(false);
  }
};

const checkInProgressIngredients = (ingredient,
  usedIngredients, setUsedIngredients) => {
  setUsedIngredients([...usedIngredients, ingredient]);
  // const getStorageData = localStorage.getItem('inProgressRecipes');
  // const getStorageParse = JSON.parse(getStorageData);
  // localStorage.setItem('inProgressRecipes', JSON.stringify(
  //   {
  //     ...getStorageParse,
  //     meals: { [id]: [...getStorageParse.meals[id], ingredient] },
  //   },
  // ));
};

const uncheckInProgressIngredients = (ingredient,
  usedIngredients, setUsedIngredients) => {
  const newUsedIngredients = usedIngredients.filter((ing) => ing !== ingredient);
  setUsedIngredients(newUsedIngredients);
  // setUsedIngredients([newUsedIngredients]);
  // const getStorageData = localStorage.getItem('inProgressRecipes');
  // const getStorageParse = JSON.parse(getStorageData);
  // const newUsedIngredients = getStorageParse.meals[id]
  //   .filter((ing) => ing !== ingredient);
  // localStorage.setItem('inProgressRecipes', JSON.stringify(
  //   {
  //     ...getStorageParse,
  //     meals: { [id]: newUsedIngredients },
  //   },
  // ));
};

export const handleCheckbox = ({ target }, usedIngredients, setUsedIngredients) => {
  target.parentElement.classList.toggle('isChecked');
  if (target.parentElement.className === 'isChecked') {
    checkInProgressIngredients(target.name, usedIngredients, setUsedIngredients);
  } else {
    uncheckInProgressIngredients(target.name, usedIngredients, setUsedIngredients);
  }
};

export const handleButton = (recipe,
  usedIngredients, setBtnFinishRecipe) => {
  if (recipe.length === usedIngredients.length && recipe.length !== 0) {
    setBtnFinishRecipe(false);
  } else { setBtnFinishRecipe(true); }
};
