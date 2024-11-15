import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        let url;
        if (searchTerm) {
          url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
        } else {
          const randomRecipes = [];
          for (let i = 0; i < 6; i++) {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data = await response.json();
            randomRecipes.push(data.meals[0]);
          }
          setRecipes(randomRecipes);
          setLoading(false);
          return;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        setRecipes(data.meals?.slice(0, 6) || []);
      } catch (error) {
        console.error('Erreur:', error);
      }
      setLoading(false);
    };

    fetchRecipes();
  }, [searchTerm]);

  if (loading) return <div className="loading">Chargement...</div>;

  return (
    <div className="recipes-grid">
      {recipes.map((recipe) => (
        <Link
          to={`/recipe/${recipe.idMeal}`}
          key={recipe.idMeal}
          className="recipe-card"
        >
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
          />
          <div className="recipe-card-content">
            <h2>{recipe.strMeal}</h2>
            <p>Catégorie: {recipe.strCategory}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;