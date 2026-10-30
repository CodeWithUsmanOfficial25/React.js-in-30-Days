import { useMemo, useState } from "react";
import { initialRecipes, categories } from "../data/day10Data";
import RecipeCard from "../components/day10/RecipeCard";
import "./Day10.css";

const emptyForm = {
  title: "",
  category: "Dinner",
  time: "",
  difficulty: "Easy",
  description: "",
  image: "",
  ingredients: "",
  instructions: ""
};

export default function Day10() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [favorites, setFavorites] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [notice, setNotice] = useState("");

  const visibleRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch = `${recipe.title} ${recipe.description} ${recipe.category}`.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || recipe.category === category;
      const matchesFavorite = !favoritesOnly || favorites.includes(recipe.id);
      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }, [recipes, search, category, favoritesOnly, favorites]);

  const toggleFavorite = (id) => {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const updateForm = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const addRecipe = (event) => {
    event.preventDefault();
    const newRecipe = {
      ...form,
      id: Date.now(),
      time: Number(form.time),
      rating: 5,
      servings: 2,
      image: form.image.trim() || "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900",
      ingredients: form.ingredients.split("\n").map((item) => item.trim()).filter(Boolean),
      instructions: form.instructions.split("\n").map((item) => item.trim()).filter(Boolean)
    };
    setRecipes((current) => [newRecipe, ...current]);
    setForm(emptyForm);
    setShowForm(false);
    setCategory("All");
    setFavoritesOnly(false);
    setSearch("");
    setNotice("Your recipe has been added!");
    window.setTimeout(() => setNotice(""), 2600);
  };

  const resetRecipes = () => {
    setRecipes(initialRecipes);
    setFavorites([]);
    setCategory("All");
    setSearch("");
    setFavoritesOnly(false);
    setNotice("Demo recipes restored.");
    window.setTimeout(() => setNotice(""), 2600);
  };

  return (
    <main className="recipe-app">
      <header className="topbar">
        <a className="brand" href="#home"><span className="brand-mark">R</span> recipebox<span className="brand-dot">.</span></a>
        <nav className="top-nav">
          <a href="#discover">Discover</a>
          <a href="#collection">My collection</a>
        </nav>
        <button className="add-recipe-button" onClick={() => setShowForm(true)}>＋ Add recipe</button>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <span className="eyebrow"><span></span> YOUR EVERYDAY FOOD JOURNAL</span>
          <h1>Good food.<br /><em>Good mood.</em></h1>
          <p>Find something delicious to make. Save the recipes you love and build a collection worth coming back to.</p>
          <a className="hero-link" href="#discover">Explore recipes <span>↘</span></a>
        </div>
        <div className="hero-visual">
          <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200" alt="Fresh colorful food spread" />
          <div className="hero-sticker"><span>Made with</span><strong>♡</strong><span>and a little spice</span></div>
          <div className="hero-caption">FRESH IDEAS FOR YOUR TABLE</div>
        </div>
      </section>

      <section className="stats-strip">
        <div><strong>{recipes.length}</strong><span>Recipes to explore</span></div>
        <div><strong>{favorites.length}</strong><span>Your favorites</span></div>
        <div><strong>{categories.length - 1}</strong><span>Food categories</span></div>
        <div className="stats-note">A little inspiration for every meal.</div>
      </section>

      <section className="discover-section" id="discover">
        <div className="section-heading">
          <div><span className="eyebrow">THE RECIPE COLLECTION</span><h2>Find your next <em>favorite.</em></h2></div>
          <button className={`collection-toggle ${favoritesOnly ? "active" : ""}`} onClick={() => setFavoritesOnly((value) => !value)}>
            ♥ {favoritesOnly ? "Showing favorites" : "View favorites"}
          </button>
        </div>

        <div className="toolbar">
          <div className="search-box"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search recipes, ingredients..." /></div>
          <button className="reset-button" onClick={resetRecipes}>Reset demo</button>
        </div>

        <div className="category-list">
          {categories.map((item) => (
            <button key={item} className={category === item ? "category-chip selected" : "category-chip"} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>

        <div className="results-line"><span>{visibleRecipes.length} recipes found</span><span>Made for curious home cooks</span></div>

        {visibleRecipes.length ? (
          <div className="recipe-grid">
            {visibleRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} isFavorite={favorites.includes(recipe.id)} onFavorite={toggleFavorite} onOpen={() => setSelectedRecipe(recipe)} />
            ))}
          </div>
        ) : (
          <div className="empty-state"><span>⌕</span><h3>No recipes found</h3><p>Try another search or change your filters.</p><button onClick={() => { setSearch(""); setCategory("All"); setFavoritesOnly(false); }}>Clear filters</button></div>
        )}
      </section>

      <footer className="footer" id="collection">
        <a className="brand" href="#home"><span className="brand-mark">R</span> recipebox<span className="brand-dot">.</span></a>
        <p>Cook something lovely today.</p>
        <span>DAY 10 · REACT.JS IN 30 DAYS</span>
      </footer>

      {notice && <div className="toast">{notice}</div>}

      {selectedRecipe && (
        <div className="modal-backdrop" onClick={() => setSelectedRecipe(null)}>
          <section className="recipe-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedRecipe(null)}>×</button>
            <img className="modal-image" src={selectedRecipe.image} alt={selectedRecipe.title} />
            <div className="modal-content">
              <span className="eyebrow">{selectedRecipe.category} · {selectedRecipe.time} MINUTES</span>
              <h2>{selectedRecipe.title}</h2>
              <p>{selectedRecipe.description}</p>
              <div className="modal-facts"><span>★ {selectedRecipe.rating.toFixed(1)} rating</span><span>{selectedRecipe.difficulty}</span><span>{selectedRecipe.servings} servings</span></div>
              <div className="modal-columns">
                <div><h3>Ingredients</h3><ul>{selectedRecipe.ingredients.map((item, index) => <li key={index}>{item}</li>)}</ul></div>
                <div><h3>Let's make it</h3><ol>{selectedRecipe.instructions.map((item, index) => <li key={index}>{item}</li>)}</ol></div>
              </div>
              <button className="modal-favorite" onClick={() => toggleFavorite(selectedRecipe.id)}>
                {favorites.includes(selectedRecipe.id) ? "♥ Saved to favorites" : "♡ Save this recipe"}
              </button>
            </div>
          </section>
        </div>
      )}

      {showForm && (
        <div className="modal-backdrop" onClick={() => setShowForm(false)}>
          <section className="form-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
            <span className="eyebrow">ADD TO YOUR COLLECTION</span>
            <h2>Share a recipe.</h2>
            <p className="form-intro">Add your own kitchen creation to RecipeBox.</p>
            <form onSubmit={addRecipe}>
              <label>Recipe name<input name="title" value={form.title} onChange={updateForm} required maxLength="55" placeholder="e.g. Sunday pancakes" /></label>
              <div className="form-row">
                <label>Category<select name="category" value={form.category} onChange={updateForm}>{categories.filter((item) => item !== "All").map((item) => <option key={item}>{item}</option>)}</select></label>
                <label>Cooking time (min)<input name="time" type="number" min="1" max="600" value={form.time} onChange={updateForm} required /></label>
              </div>
              <div className="form-row">
                <label>Difficulty<select name="difficulty" value={form.difficulty} onChange={updateForm}><option>Easy</option><option>Medium</option><option>Hard</option></select></label>
                <label>Image URL<input name="image" value={form.image} onChange={updateForm} placeholder="Optional image link" /></label>
              </div>
              <label>Short description<input name="description" value={form.description} onChange={updateForm} required maxLength="130" placeholder="What makes it special?" /></label>
              <label>Ingredients <span className="field-hint">One ingredient per line</span><textarea name="ingredients" value={form.ingredients} onChange={updateForm} required rows="4" placeholder={"2 eggs\n1 cup flour\n1 cup milk"} /></label>
              <label>Instructions <span className="field-hint">One step per line</span><textarea name="instructions" value={form.instructions} onChange={updateForm} required rows="4" placeholder={"Prepare your ingredients\nMix everything together\nCook and serve"} /></label>
              <button className="submit-recipe" type="submit">Add to RecipeBox <span>↗</span></button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}