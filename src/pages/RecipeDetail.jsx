import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setRecipe(data.meals[0]);
      } catch (error) {
        console.error('Erreur:', error);
      }
      setLoading(false);
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div className="loading">Chargement...</div>;
  if (!recipe) return <div className="loading">Recette non trouvée</div>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="recipe-detail">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h1>{recipe.strMeal}</h1>
      <p>Catégorie: {recipe.strCategory}</p>
      
      <h2>Ingrédients:</h2>
      <ul className="ingredients-list">
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h2>Instructions:</h2>
      <p>{recipe.strInstructions}</p>
    </div>
  );
};

export default RecipeDetail;