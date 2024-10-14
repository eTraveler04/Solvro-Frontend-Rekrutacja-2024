'use client';

import { useState } from 'react';
import Modal from './Modal/modal';
import './cocktailList.css';

export default function CocktailList({
  cocktails,
  addFavorite,
  removeFavorite,
  favorites,
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
      {cocktails.map((cocktail) => (
        <div
          key={cocktail.id}
          className="cocktail-card"
          onClick={() => handleCocktailClick(cocktail)}
        >
          <h3>{cocktail.name}</h3>
        </div>
      ))}

      {/* Renderuj modal tylko wtedy, gdy jest wybrany koktajl */}
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
