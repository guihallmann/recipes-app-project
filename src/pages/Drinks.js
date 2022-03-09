import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import { MAX_LIST_SIZE } from '../data/consts';

function Drinks() {
  const { drinksList } = useContext(RecipesContext);
  return (
    <section>
      <Header title="Drinks" />
      <div>
        {drinksList.map((drink, index) => (index <= MAX_LIST_SIZE && <Card
          key={ drink.idMeal }
          index={ index }
          image={ drink.strDrinkThumb }
          name={ drink.strDrink }
        />
        ))}
      </div>
      <Footer />
    </section>
  );
}

export default Drinks;
