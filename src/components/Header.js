import React from 'react';

function Header({ props: profile, title, search }) {
  return (
    <header>
      <span>{profile}</span>
      <span>{title}</span>
      <span>{search}</span>
    </header>
  );
}

Header.Pro;

export default Header;
