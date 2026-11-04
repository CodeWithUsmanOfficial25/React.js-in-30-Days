import React, { useMemo, useState } from "react";
import ProductCard from "../components/day15/ProductCard";
import { categories, products } from "../data/day15Data";
import "./Day15.css";

function Day15() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [sortOrder, setSortOrder] = useState("featured");
  const [mobileMenu, setMobileMenu] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const categoryMatch = activeCategory === "All Products" || product.category === activeCategory;
      const searchMatch = product.name.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });

    if (sortOrder === "low") result = [...result].sort((a, b) => a.price - b.price);
    if (sortOrder === "high") result = [...result].sort((a, b) => b.price - a.price);
    if (sortOrder === "rating") result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [activeCategory, search, sortOrder]);

  const cartItems = products.filter((product) => cart[product.id] > 0);
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const cartTotal = cartItems.reduce((sum, product) => sum + product.price * cart[product.id], 0);

  const addToCart = (product) => {
    setCart((previous) => ({
      ...previous,
      [product.id]: (previous[product.id] || 0) + 1
    }));
  };

  const removeFromCart = (id) => {
    setCart((previous) => {
      const updated = { ...previous };
      if (updated[id] > 1) updated[id] -= 1;
      else delete updated[id];
      return updated;
    });
  };

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const scrollToProducts = () => {
    document.getElementById("h-products")?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  return (
    <div className="harvestly">
      <div className="h-announcement">
        <span>✦</span> Freshness delivered to your doorstep <span>✦</span>
      </div>

      <header className="h-header">
        <a href="#home" className="h-logo">
          <span className="h-logo-icon">✿</span>
          <span>harvestly<span className="h-logo-dot">.</span></span>
        </a>

        <nav className={mobileMenu ? "h-nav h-nav-open" : "h-nav"}>
          <a href="#home" onClick={() => setMobileMenu(false)}>Home</a>
          <a href="#h-products" onClick={() => setMobileMenu(false)}>Shop</a>
          <a href="#h-benefits" onClick={() => setMobileMenu(false)}>Our Story</a>
          <a href="#h-footer" onClick={() => setMobileMenu(false)}>Contact</a>
        </nav>

        <div className="h-header-actions">
          <button className="h-favorite-link" onClick={() => {
            setActiveCategory("All Products");
            setSearch("");
            scrollToProducts();
          }}>
            ♡ <span>Favorites ({favorites.length})</span>
          </button>
          <button className="h-cart-button" onClick={() => setShowCart(true)}>
            <span>▣</span> My Basket <b>{cartCount}</b>
          </button>
          <button className="h-menu-button" onClick={() => setMobileMenu(!mobileMenu)}>
            ☰
          </button>
        </div>
      </header>

      <main id="home">
        <section className="h-hero">
          <div className="h-hero-content">
            <span className="h-eyebrow"><span>✳</span> GOOD FOOD. GOOD MOOD.</span>
            <h1>Fresh food,<br />better <span>living.</span></h1>
            <p>Bring home the goodness of nature. Shop fresh, handpicked groceries from trusted local farms, delivered right to your door.</p>
            <button className="h-primary-button" onClick={scrollToProducts}>
              Explore Fresh Picks <span>→</span>
            </button>
            <div className="h-hero-trust">
              <span>✓ Farm fresh</span>
              <span>✓ Quality first</span>
              <span>✓ Quick delivery</span>
            </div>
          </div>

          <div className="h-hero-visual">
            <div className="h-hero-circle"></div>
            <div className="h-hero-food">🥑</div>
            <div className="h-floating h-floating-one">🍓</div>
            <div className="h-floating h-floating-two">🥬</div>
            <div className="h-floating h-floating-three">🍊</div>
            <div className="h-hero-sticker">
              <strong>100%</strong>
              <span>Natural<br />Goodness</span>
            </div>
          </div>
          <div className="h-hero-number">01 / FRESHNESS</div>
        </section>

        <section className="h-benefits" id="h-benefits">
          <div className="h-benefit">
            <span className="h-benefit-icon">🌱</span>
            <div><strong>Farm Fresh</strong><span>Sourced with care</span></div>
          </div>
          <div className="h-benefit">
            <span className="h-benefit-icon">🚚</span>
            <div><strong>Fast Delivery</strong><span>Fresh at your door</span></div>
          </div>
          <div className="h-benefit">
            <span className="h-benefit-icon">♧</span>
            <div><strong>100% Quality</strong><span>Only the good stuff</span></div>
          </div>
          <div className="h-benefit">
            <span className="h-benefit-icon">♡</span>
            <div><strong>Made with Love</strong><span>For healthier living</span></div>
          </div>
        </section>

        <section className="h-shop-section" id="h-products">
          <div className="h-section-heading">
            <div>
              <span className="h-eyebrow">THE GOOD STUFF</span>
              <h2>Shop fresh <span>finds.</span></h2>
              <p>Everything your kitchen deserves, all in one place.</p>
            </div>
            <div className="h-product-count">{filteredProducts.length} products available</div>
          </div>

          <div className="h-shop-toolbar">
            <div className="h-categories">
              {categories.map((category) => (
                <button
                  key={category}
                  className={activeCategory === category ? "h-category active" : "h-category"}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="h-shop-controls">
              <label className="h-search">
                <span>⌕</span>
                <input
                  type="text"
                  placeholder="Search fresh products..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
              <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} aria-label="Sort products">
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          <div className="h-product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={cart[product.id] || 0}
                  onAdd={addToCart}
                  onRemove={removeFromCart}
                  isFavorite={favorites.includes(product.id)}
                  onFavorite={toggleFavorite}
                />
              ))
            ) : (
              <div className="h-empty-state">
                <span>🥬</span>
                <h3>No fresh finds here!</h3>
                <p>Try another search or category.</p>
                <button onClick={() => { setSearch(""); setActiveCategory("All Products"); }}>Show all products</button>
              </div>
            )}
          </div>
        </section>

        <section className="h-promo">
          <div className="h-promo-content">
            <span className="h-eyebrow">A LITTLE SOMETHING EXTRA</span>
            <h2>Eat fresh.<br /><span>Feel amazing.</span></h2>
            <p>Make every meal a little more special with nature's finest ingredients.</p>
            <button onClick={scrollToProducts}>Shop the collection →</button>
          </div>
          <div className="h-promo-visual">🥗</div>
          <div className="h-promo-decoration">FRESH<br />IS BEST</div>
        </section>
      </main>

      <footer className="h-footer" id="h-footer">
        <a href="#home" className="h-logo h-footer-logo">
          <span className="h-logo-icon">✿</span>
          <span>harvestly<span className="h-logo-dot">.</span></span>
        </a>
        <p>Good food starts with good choices.</p>
        <span>© 2026 Harvestly. Made for fresh living.</span>
      </footer>

      {showCart && (
        <div className="h-cart-overlay" onClick={() => setShowCart(false)}>
          <aside className="h-cart-panel" onClick={(event) => event.stopPropagation()}>
            <div className="h-cart-heading">
              <div><span className="h-eyebrow">YOUR FRESH PICKS</span><h2>My Basket <span>({cartCount})</span></h2></div>
              <button onClick={() => setShowCart(false)}>✕</button>
            </div>

            <div className="h-cart-items">
              {cartItems.length === 0 ? (
                <div className="h-cart-empty"><span>🧺</span><h3>Your basket is empty</h3><p>Let's fill it with something fresh!</p></div>
              ) : cartItems.map((product) => (
                <div className="h-cart-item" key={product.id}>
                  <div className="h-cart-item-image" style={{ backgroundColor: product.color }}>{product.emoji}</div>
                  <div className="h-cart-item-info">
                    <strong>{product.name}</strong>
                    <span>${product.price.toFixed(2)} / {product.unit}</span>
                    <div className="h-quantity-control">
                      <button onClick={() => removeFromCart(product.id)}>−</button>
                      <span>{cart[product.id]}</span>
                      <button onClick={() => addToCart(product)}>+</button>
                    </div>
                  </div>
                  <strong className="h-cart-line-total">${(product.price * cart[product.id]).toFixed(2)}</strong>
                </div>
              ))}
            </div>

            <div className="h-cart-summary">
              <div><span>Subtotal</span><strong>${cartTotal.toFixed(2)}</strong></div>
              <div><span>Delivery</span><strong>{cartTotal === 0 ? "$0.00" : "FREE"}</strong></div>
              <div className="h-cart-grand-total"><span>Total</span><strong>${cartTotal.toFixed(2)}</strong></div>
              <button disabled={cartCount === 0} onClick={() => window.alert("Thanks for shopping with Harvestly! This is a demo checkout.")}>Continue to Checkout →</button>
              <p>Freshness is just around the corner.</p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default Day15;
