'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import './modal.css';
import star from './star.png';
import starColored from './star_colored.png';

// Funkcja do pobierania pełnych danych składnika po ID
async function getIngredientsById(cocktailId) {
  const response = await fetch(
    `https://cocktails.solvro.pl/api/v1/cocktails/${cocktailId}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.data;
}

export default function Modal({
  cocktail,
  onClose,
  addFavorite,
  removeFavorite,
  favorites,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [ingredientNames, setIngredientNames] = useState([]);
  const [error, setError] = useState(null); // Dodajemy stan dla obsługi błędów

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        // Pobieramy składniki koktajlu za pomocą jego ID
        const Ingredients = await getIngredientsById(cocktail.id);

        // Zakładam, że Ingredients zawiera tablicę składników
        const fetchedIngredients = Ingredients.ingredients.map(
          (ingredient) => ingredient.name
        );

        // Zapisujemy nazwy składników w stanie
        setIngredientNames(fetchedIngredients);
      } catch (err) {
        setError(err.message); // Obsługa błędów
      }
    };

    if (cocktail) {
      fetchIngredients();
    }
  }, [cocktail]);

  useEffect(() => {
    // Ustaw stan isFavorite na true, jeśli koktajl jest w ulubionych
    const isFav = favorites.some((fav) => fav.id === cocktail.id);
    setIsFavorite(isFav);
  }, [favorites, cocktail]);

  if (!cocktail) return null; // Nie renderuj modala, jeśli nie ma wybranego koktajlu

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(cocktail.id);
    } else {
      addFavorite(cocktail);
    }
    setIsFavorite(!isFavorite);
  };

  if (error) return <div>Error: {error}</div>; // Wyświetlenie błędu, jeśli wystąpił

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="div-modal-buttons">
          <Image
            className="fav-button"
            src={isFavorite ? starColored : star}
            alt={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            width={20}
            height={20}
            onClick={handleToggleFavorite}
          />
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <h2>{cocktail.name}</h2>
        <Image
          className="modal-image"
          src={cocktail.imageUrl}
          alt={cocktail.name}
          width={300}
          height={200}
        />
        <h3>Kategoria:</h3>
        <p>{cocktail.category}</p>
        <h3>Szklanka:</h3>
        <p>{cocktail.glass}</p>

        <h3>Składniki:</h3>
        <ul>
          {ingredientNames.length > 0 ? (
            ingredientNames.map((name, index) => <li key={index}>{name}</li>)
          ) : (
            <li>Brak dostępnych składników</li>
          )}
        </ul>

        <h3>Instrukcje:</h3>
        <p>{cocktail.instructions}</p>
      </div>
    </div>
  );
}
