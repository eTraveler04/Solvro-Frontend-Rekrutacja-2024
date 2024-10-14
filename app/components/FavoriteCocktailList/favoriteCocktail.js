'use client';

import { useState } from 'react';
import Modal from '../CocktailPageDisplay/CocktailList/Modal/modal';

export default function FavoriteCocktails({
  favorites,
  addFavorite,
  removeFavorite,
}) {
  const [selectedCocktail, setSelectedCocktail] = useState(null);

  const handleCocktailClick = (cocktail) => {
    setSelectedCocktail(cocktail); // Ustawia wybrany koktajl, aby otworzyć modal
  };

  const closeModal = () => {
    setSelectedCocktail(null);
  };
  return (
    <div className="div_cocktail_list">
      {favorites.map((favorite) => (
        <div
          key={favorite.id}
          className="cocktail-card"
          onClick={() => handleCocktailClick(favorite)}
        >
          <h3>{favorite.name}</h3>
        </div>
      ))}

      {selectedCocktail && (
        <Modal
          cocktail={selectedCocktail}
          onClose={closeModal}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          favorites={favorites}
        />
      )}
    </div>
  );
}
