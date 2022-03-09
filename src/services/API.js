// const CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
// const NATIONALITIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
// const MEAL_INGREDIENTS_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
// const MEAL_RANDOM_URL = 'www.themealdb.com/api/json/v1/1/random.php';
// const DRINK_RANDOM_URL = 'www.thecocktaildb.com/api/json/v1/1/random.php';

// export async function getMealCategories() {
//   const response = await
//   (fetch(CATEGORIES_URL));
//   const data = await response.json();
//   return data;
// }

// export async function getNationalities() {
//   const response = await
//   (fetch(NATIONALITIES_URL));
//   const data = await response.json();
//   return data;
// }

// export async function getMealIngredients() {
//   const response = await
//   (fetch(MEAL_INGREDIENTS_URL));
//   const data = await response.json();
//   return data;
// }

// export async function getRandomMeal() {
//   const response = await
//   (fetch(MEAL_RANDOM_URL));
//   const data = await response.json();
//   return data;
// }

// export async function getRandomDrink() {
//   const response = await
//   (fetch(DRINK_RANDOM_URL));
//   const data = await response.json();
//   return data;
// }

// export async function getMealName(mealName) {
//   const response = await
//   (fetch(`www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`));
//   const data = await response.json();
//   return data;
// }

// export async function getMealLetter(mealLetter) {
//   const response = await
//   (fetch(`www.themealdb.com/api/json/v1/1/search.php?s=${mealLetter}`));
//   const data = await response.json();
//   return data;
// }

// export async function getMealDetails(mealId) {
//   const response = await
//   (fetch(`www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`));
//   const data = await response.json();
//   return data;
// } // meal ID example 52845

// export async function getDrinkName(drinkName) {
//   const response = await
//   (fetch(`www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`));
//   const data = await response.json();
//   return data;
// }

// export async function getDrinkLetter(letter) {
//   const response = await
//   (fetch(`www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`));
//   const data = await response.json();
//   return data;
// }

// export async function getDrinkIngredient(ingredient) {
//   const response = await
//   (fetch(`www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredient}`));
//   const data = await response.json();
//   return data;
// }

// export async function getDrinkDetails(drinkId) {
//   const response = await
//   (fetch(`www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`));
//   const data = await response.json();
//   return data;
// }

export async function getMealIngredient(ingredient) {
  try {
    const response = await (fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`));
    const data = await (response).json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}

export async function getMealName(name) {
  try {
    const response = await (fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`));
    const data = await (response).json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}

export async function getMealLetter(letter) {
  try {
    const response = await (fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`));
    const data = await (response).json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}
export async function getDrinkIngredient(ingredient) {
  try {
    const response = await (fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`));
    const data = await (response).json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}

export async function getDrinkName(name) {
  try {
    const response = await (fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`));
    const data = await (response).json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}

export async function getDrinkLetter(letter) {
  try {
    const response = await (fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`));
    const data = await (response).json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}
