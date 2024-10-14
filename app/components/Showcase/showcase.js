'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Modal from '../CocktailPageDisplay/CocktailList/Modal/modal';

export default function Showcase({
  cocktails,
  addFavorite,
  removeFavorite,
  favorites,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedCocktail, setSelectedCocktail] = useState(null);

  const handleCocktailClick = (cocktail) => {
    setSelectedCocktail(cocktail); // Ustawia wybrany koktajl, aby otworzyć modal
  };

  const closeModal = () => {
    setSelectedCocktail(null);
  };

  // Interwał do zmiany koktajli co 3 sekundy
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === cocktails.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    // Wyczyść interwał przy odmontowaniu komponentu
    return () => clearInterval(interval);
  }, [cocktails]);

  const currentCocktail = cocktails[currentIndex];

  return (
    <div className="div_image_showcase">
      {currentCocktail && (
        <Image
          className="image"
          id="cocktailImage"
          src={currentCocktail.imageUrl}
          width={650}
          height={500}
          alt={currentCocktail.name}
          onClick={() => handleCocktailClick(currentCocktail)}
        />
      )}

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
