import React, { useEffect, useState } from 'react';
import CardDoneRecipes from '../components/CardDoneRecipes';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  useEffect(() => {
    const LSdoneRecipes = localStorage.getItem(doneRecipes);
    setDoneRecipes(JSON.parse(LSdoneRecipes));
  }, []);
  return (
    <section>
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
        {doneRecipes.map((recipe, index) => (
          <CardDoneRecipes
            key={ recipe.id }
            recipe={ recipe }
            index={ index }
          />))}
      </div>
    </section>
  );
}

export default DoneRecipes;
