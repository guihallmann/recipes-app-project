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
  if (favRecipes) {
    const favRecipesParse = JSON.parse(favRecipes);
    const getFav = favRecipesParse.find((fav) => fav.id === id);
    if (getFav !== undefined) setFavStatus(true);
  }
  localStorage.setItem('favoriteRecipes', []);
};

export const setFavoriteMeal = (favStatus, setFavStatus, mealDetails) => {
  const favRecipes = localStorage.getItem('favoriteRecipes');
  if (!favStatus) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favRecipes, {
      id: mealDetails.idMeal,
      type: 'food',
      nationality: mealDetails.strArea,
      category: mealDetails.strCategory,
      alcoholicOrNot: '',
      name: mealDetails.strMeal,
      image: mealDetails.strMealThumb,
    }]));
    setFavStatus(true);
  }
  if (favStatus) {
    const favRecipesParse = JSON.parse(favRecipes);
    const removeFav = favRecipesParse.filter((fav) => fav.id !== mealDetails.idMeal);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFav));
    setFavStatus(false);
  }
};

export const setFavoriteDrink = (favStatus, setFavStatus, drinkDetails) => {
  const favRecipes = localStorage.getItem('favoriteRecipes');
  if (!favStatus) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favRecipes, {
      id: drinkDetails.idDrink,
      type: 'drink',
      nationality: '',
      category: drinkDetails.strCategory,
      alcoholicOrNot: drinkDetails.strAlcoholic,
      name: drinkDetails.strDrink,
      image: drinkDetails.strDrinkThumb,
    }]));
    setFavStatus(true);
  }
  if (favStatus) {
    const favRecipesParse = JSON.parse(favRecipes);
    const removeFav = favRecipesParse.filter((fav) => fav.id !== drinkDetails.idDrink);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFav));
    setFavStatus(false);
  }
};
