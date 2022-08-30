import React from 'react';
import RecipesProvider from './context/RecipesProvider';
import Rotas from './services/Rotas';

function App() {
  return (
    <RecipesProvider>
      <Rotas />
    </RecipesProvider>
  );
}

export default App;
