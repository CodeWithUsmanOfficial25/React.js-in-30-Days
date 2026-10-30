export default function RecipeCard({ recipe, isFavorite, onFavorite, onOpen }) {
  return (
    <article className="recipe-card">
      <div className="recipe-image-wrap" onClick={onOpen}>
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        <span className="recipe-category">{recipe.category}</span>
        <button
          className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
          onClick={(event) => {
            event.stopPropagation();
            onFavorite(recipe.id);
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>
      <div className="recipe-card-content">
        <div className="recipe-meta">
          <span>◷ {recipe.time} min</span>
          <span>★ {recipe.rating.toFixed(1)}</span>
        </div>
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
        <div className="recipe-card-bottom">
          <span className={`difficulty ${recipe.difficulty.toLowerCase()}`}>{recipe.difficulty}</span>
          <button className="view-recipe" onClick={onOpen}>View recipe <span>↗</span></button>
        </div>
      </div>
    </article>
  );
}