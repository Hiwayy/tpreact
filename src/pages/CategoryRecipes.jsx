import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    const fetchCategoryRecipes = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();
        setRecipes(data.meals);
      } catch (error) {
        console.error('Erreur:', error);
      }
      setLoading(false);
    };

    fetchCategoryRecipes();
  }, [category]);

  if (loading) return <div className="loading">Chargement...</div>;

  return (
    <div>
      <h1 className="category-title">Recettes {category}</h1>
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <Link
            to={`/recipe/${recipe.idMeal}`}
            key={recipe.idMeal}
            className="recipe-card"
          >
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <div className="recipe-card-content">
              <h2>{recipe.strMeal}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryRecipes;