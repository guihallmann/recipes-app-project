const CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
// const NATIONALITIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
// const MEAL_INGREDIENTS_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
// const MEAL_INGREDIENTS_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
// const MEAL_RANDOM_URL = 'www.themealdb.com/api/json/v1/1/random.php';
// const DRINK_RANDOM_URL = 'www.thecocktaildb.com/api/json/v1/1/random.php';

export async function getMealCategories() {
  const categories = await fetch(CATEGORIES_URL)
    .then((response) => response.json())
    .then((data) => data.meals)
    .then((list) => list.map((item) => item.strCategory));
  return categories;
}

export async function getDrinkCategories() {
  const categories = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((data) => data.drinks)
    .then((list) => list.map((item) => item.strCategory));
  return categories;
}

export async function searchByDrinkCategories(category) {
  const categories = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((data) => data.drinks);
  return categories;
}

export async function searchByMealCategories(category) {
  const categories = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((data) => data.meals);
  return categories;
}

export async function getNationalities() {
  try {
    const response = await
    (fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list'));
    const data = await response.json();
    return data.meals;
  } catch (error) {
    return error;
  }
}

export async function getRandomMeal() {
  try {
    const response = await
    (fetch('https://www.themealdb.com/api/json/v1/1/random.php'));
    const data = await response.json();
    return data.meals;
  } catch (error) {
    return error;
  }
}

export async function getRandomDrink() {
  try {
    const response = await
    (fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php'));
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    return error;
  }
}

export async function getMealIngredient(ingredient) {
  try {
    const response = await (fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`));
    const data = await (response).json();
    // console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}

export async function getAllMealIngredients() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();
    return data.meals;
  } catch (error) {
    return error;
  }
}

export async function getMealName(name) {
  try {
    const response = await (fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`));
    const data = await (response).json();
    // console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}

export async function getMealLetter(letter) {
  try {
    const response = await (fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`));
    const data = await (response).json();
    // console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}

export async function getAllDrinkIngredients() {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    return error;
  }
}

export async function getDrinkIngredient(ingredient) {
  try {
    const response = await (fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`));
    const data = await (response).json();
    // console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}

export async function getDrinkName(name) {
  try {
    const response = await (fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`));
    const data = await (response).json();
    // console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}

export async function getDrinkLetter(letter) {
  try {
    const response = await (fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`));
    const data = await (response).json();
    // console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}

export async function getTwelveMeals() {
  const meals = fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((data) => data.meals);
  return meals;
}

export async function getTwelveDrinks() {
  const drinks = fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((data) => data.drinks);
  return drinks;
}

export async function getMealDetails(id) {
  try {
    const response = await (fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`));
    const data = await (response).json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getDrinkDetails(id) {
  try {
    const response = await (fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`));
    const data = await (response).json();
    // console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}

export async function getDrinksRecommends() {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    return error;
  }
}

export async function getMealsRecommends() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data.meals;
  } catch (error) {
    return error;
  }
}
