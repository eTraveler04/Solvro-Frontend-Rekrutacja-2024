'use client';

import { useState } from 'react';
import './filter.css';

export default function Modal({ onFilter, categories, glasses }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGlass, setSelectedGlass] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleGlassChange = (event) => {
    setSelectedGlass(event.target.value);
  };

  const applyFilter = () => {
    onFilter(selectedCategory, selectedGlass);
  };

  return (
    <div className="div-filter">
      <div>
        <label className="filter-label">Kategoria:</label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Wszystkie kategorie</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="filter-label">Szkło:</label>
        <select value={selectedGlass} onChange={handleGlassChange}>
          <option value="">Wszystkie rodzaje szkła</option>
          {glasses.map((glass) => (
            <option key={glass} value={glass}>
              {glass}
            </option>
          ))}
        </select>
      </div>
      <button onClick={applyFilter}>Zastosuj filtr</button>
    </div>
  );
}
