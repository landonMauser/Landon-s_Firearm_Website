import "../css/RecipeCard.css";

function RecipeCard({ recipe, onToggleFavorite }) {
  // Handle heart click: ask parent to toggle favorite
  function onFavClick() {
    const newFav = recipe.favorite === 0 ? 1 : 0;
    onToggleFavorite(recipe.recipeid, newFav);
  }

  return (
    <div className="recipe-card">
      <div className="recipe-poster">
        <img
          className="recipe-img"
          src={`/images/${recipe.picture}`}
          alt={recipe.recipename}
        />
        <div className="recipe-overlay">
          <button className="favorite-btn" onClick={onFavClick}>
            {recipe.favorite === 0 ? "♡" : "❤️"}
          </button>
        </div>
      </div>
      <div className="recipe-info">
        <h3>{recipe.recipename}</h3>
        <p>{recipe.categoryname}</p>
      </div>
    </div>
  );
}

export default RecipeCard;
