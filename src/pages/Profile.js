import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const user = localStorage.getItem('user');
  const objEmail = JSON.parse(user);
  const userObj = objEmail || 'email@null.com';
  const history = useHistory();

  const handleClick = (path) => {
    if (path === '/') {
      localStorage.clear();
    }
    history.push(path);
  };

  return (
    <div>
      <Header title="Profile" />
      <h2 data-testid="profile-email">{userObj.email}</h2>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => handleClick('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => handleClick('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => handleClick('/') }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}
export default Profile;
