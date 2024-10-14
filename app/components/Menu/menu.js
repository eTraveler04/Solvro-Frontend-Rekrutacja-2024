// components/Menu/Menu.js
'use client';

import Image from 'next/image';
import home from '../icons/home.png';
import cocktail from '../icons/cocktail.png';
import star from '../icons/star.png';
import logo from '../images/logo.png';

export default function Menu({ showHome, showCocktails, showFavorites }) {
  return (
    <div className="menu">
      <Image
        src={logo}
        className="img_menu_logo"
        width={150}
        height={50}
        alt="Logo"
      />
      <h1>Solvro Cocktails</h1>
      <div className="menu_buttons">
        <div
          className="menu_btn"
          onClick={showHome}
          style={{ cursor: 'pointer' }}
        >
          <Image
            src={home}
            className="img_star"
            width={30}
            height={30}
            alt="home"
          />
          <p>Home</p>
        </div>
        <div
          className="menu_btn"
          onClick={showCocktails}
          style={{ cursor: 'pointer' }}
        >
          <Image
            src={cocktail}
            className="img_star"
            width={30}
            height={30}
            alt="Cocktail List"
          />
          <p>Lista Koktajli</p>
        </div>
        <div
          className="menu_btn"
          onClick={showFavorites}
          style={{ cursor: 'pointer' }}
        >
          <Image
            src={star}
            className="img_star"
            width={30}
            height={30}
            alt="Favorite Cocktails"
          />
          <p>Ulubione Koktajle</p>
        </div>
      </div>
    </div>
  );
}
