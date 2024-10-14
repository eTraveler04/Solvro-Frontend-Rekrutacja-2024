'use client';

import { useState, useEffect } from 'react';
// Importy komponentów
import Menu from './components/Menu/menu';
import Showcase from './components/Showcase/showcase';
import FavoriteCocktails from './components/FavoriteCocktailList/favoriteCocktail';
import FilterableList from './components/CocktailPageDisplay/cocktailPageDisplay';

import {
  FavoritesProvider,
  useFavorites,
} from './components/FavoriteCocktailArray'; // Importowanie provider i hooka

// Importy stylów (jeśli potrzebujesz)
import './components/Menu/menu.css';
import './components/Showcase/showcase.css';
import './components/CocktailPageDisplay/CocktailList/cocktailList.css';

async function getCocktails() {
  const response = await fetch('https://cocktails.solvro.pl/api/v1/cocktails');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.data;
}

function HomeContent() {
  const [cocktails, setCocktails] = useState([]);
  const [activeSection, setActiveSection] = useState('home');
  const { favorites, addFavorite, removeFavorite } = useFavorites(); // Uzyskanie dostępu do ulubionych koktajli

  useEffect(() => {
    const fetchCocktails = async () => {
      const cocktailsData = await getCocktails();
      setCocktails(cocktailsData);
    };

    fetchCocktails();
  }, []);

  const showHome = () => setActiveSection('home');
  const showCocktails = () => setActiveSection('cocktails');
  const showFavorites = () => setActiveSection('favorites');

  return (
    <div className="container">
      <Menu
        showHome={showHome}
        showCocktails={showCocktails}
        showFavorites={showFavorites}
      />

      <div className="show_box">
        {activeSection === 'home' && (
          <Showcase
            cocktails={cocktails}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
            favorites={favorites}
          />
        )}
        {activeSection === 'cocktails' && (
          <div className="div_list_details">
            <FilterableList
              cocktails={cocktails}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
              favorites={favorites}
            />
          </div>
        )}
        {activeSection === 'favorites' && (
          <FavoriteCocktails
            favorites={favorites}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <FavoritesProvider>
      <HomeContent />
    </FavoritesProvider>
  );
}
