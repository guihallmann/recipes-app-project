import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const user = localStorage.getItem('user');
  const userObj = JSON.parse(user);
  return (
    <div>
      <Header title="Profile" />
      <p data-testid="profile-email">{userObj.email}</p>
      <button data-testid="profile-done-btn" type="button">Done Recipes</button>
      <button type="button" data-testid="profile-favorite-btn">
        Favorite Recipes
      </button>
      <button data-testid="profile-logout-btn" type="button">Logout</button>

      <Footer />
    </div>
  );
}
export default Profile;
