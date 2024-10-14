// context/FavoritesContext.js
import React, { createContext, useState, useContext } from 'react';

// Tworzymy kontekst
const FavoritesContext = createContext();

// Tworzymy dostawcę kontekstu (provider)
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (newFavorite) => {
    setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
  };

  const removeFavorite = (favoriteId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favorite) => favorite.id !== favoriteId)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Tworzymy funkcję, która ułatwia korzystanie z kontekstu
export const useFavorites = () => useContext(FavoritesContext);
