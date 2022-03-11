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
};
