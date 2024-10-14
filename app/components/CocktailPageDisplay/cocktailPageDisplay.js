'use client';

import { useState } from 'react';
import Modal from './Filter/filter';
import CocktailList from './CocktailList/cocktailList';
import './cocktailPageDisplay.css';

export default function FilterableList({
  cocktails,
  addFavorite,
  removeFavorite,
  favorites,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredCocktails, setFilteredCocktails] = useState(cocktails);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Pobieranie unikalnych kategorii i rodzajów szkła
  const categories = [
    ...new Set(cocktails.map((cocktail) => cocktail.category)),
  ];
  const glasses = [...new Set(cocktails.map((cocktail) => cocktail.glass))];

  const handleFilter = (category, glass) => {
    const filtered = cocktails.filter((cocktail) => {
      return (
        (category === '' || cocktail.category === category) &&
        (glass === '' || cocktail.glass === glass)
      );
    });
    setFilteredCocktails(filtered);
  };

  return (
    <div className="div-filter-content">
      <Modal
        onFilter={handleFilter}
        categories={categories}
        glasses={glasses}
      />
      <CocktailList
        cocktails={filteredCocktails}
        addFavorite={addFavorite}
        removeFavorite={removeFavorite}
        favorites={favorites}
      />
    </div>
  );
}
