import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Erreur:', error);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  if (loading) return <div className="loading">Chargement...</div>;

  return (
    <div className="recipes-grid">
      {categories.map((category) => (
        <Link
          to={`/category/${category.strCategory}`}
          key={category.idCategory}
          className="recipe-card"
        >
          <img
            src={category.strCategoryThumb}
            alt={category.strCategory}
          />
          <div className="recipe-card-content">
            <h2>{category.strCategory}</h2>
            <p>{category.strCategoryDescription}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Categories;