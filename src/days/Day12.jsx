import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/day12/ProductCard";
import { initialProducts, productCategories, getStockStatus, formatCurrency } from "../data/day12Data";
import "./Day12.css";

const storageKey = "stocksphere-products-day12";
const blankForm = { name: "", sku: "", category: "Electronics", price: "", quantity: "", threshold: "" };

function readProducts() {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : initialProducts;
  } catch {
    return initialProducts;
  }
}

export default function Day12() {
  const [products, setProducts] = useState(readProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [statusFilter, setStatusFilter] = useState("All stock");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(blankForm);
  const [notice, setNotice] = useState("");
  const [activeView, setActiveView] = useState("overview");

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(products));
  }, [products]);

  const stats = useMemo(() => {
    const units = products.reduce((total, product) => total + product.quantity, 0);
    const value = products.reduce((total, product) => total + product.quantity * product.price, 0);
    const low = products.filter((product) => getStockStatus(product) !== "In stock").length;
    const out = products.filter((product) => product.quantity === 0).length;

    return { total: products.length, units, value, low, out };
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const query = search.toLowerCase();
      const matchesSearch = product.name.toLowerCase().includes(query) || product.sku.toLowerCase().includes(query);
      const matchesCategory = categoryFilter === "All categories" || product.category === categoryFilter;
      const status = getStockStatus(product);
      const matchesStatus = statusFilter === "All stock" || status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, search, categoryFilter, statusFilter]);

  const lowStockProducts = products.filter((product) => getStockStatus(product) !== "In stock");

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm(blankForm);
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: String(product.price),
      quantity: String(product.quantity),
      threshold: String(product.threshold)
    });
    setShowModal(true);
  };

  const updateForm = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const saveProduct = (event) => {
    event.preventDefault();

    const cleanSku = form.sku.trim().toUpperCase();
    const duplicateSku = products.some((product) => product.sku.toLowerCase() === cleanSku.toLowerCase() && product.id !== editingId);

    if (duplicateSku) {
      showNotice("That SKU is already in use.");
      return;
    }

    const productData = {
      name: form.name.trim(),
      sku: cleanSku,
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity),
      threshold: Number(form.threshold)
    };

    if (editingId !== null) {
      setProducts((current) => current.map((product) => product.id === editingId ? { ...product, ...productData } : product));
      showNotice("Product details updated.");
    } else {
      setProducts((current) => [{ id: Date.now(), ...productData }, ...current]);
      showNotice("New product added to inventory.");
    }

    setShowModal(false);
    setForm(blankForm);
    setEditingId(null);
  };

  const adjustStock = (id, amount) => {
    setProducts((current) => current.map((product) =>
      product.id === id ? { ...product, quantity: Math.max(0, product.quantity + amount) } : product
    ));
  };

  const deleteProduct = (id) => {
    const product = products.find((item) => item.id === id);
    if (!product) return;
    if (!window.confirm(`Delete ${product.name} from inventory?`)) return;
    setProducts((current) => current.filter((item) => item.id !== id));
    showNotice("Product removed from inventory.");
  };

  const resetDemo = () => {
    if (!window.confirm("Restore the original demo inventory? Your current changes will be replaced.")) return;
    setProducts(initialProducts);
    setSearch("");
    setCategoryFilter("All categories");
    setStatusFilter("All stock");
    showNotice("Demo inventory restored.");
  };

  return (
    <main className="stock-app">
      <div className="glow glow-a"></div>
      <div className="glow glow-b"></div>

      <aside className="sidebar clay-surface">
        <a className="stock-brand" href="#dashboard">
          <span className="brand-orb">S</span>
          <span>stock<span>sphere</span></span>
        </a>

        <div className="sidebar-label">WORKSPACE</div>
        <nav className="side-nav">
          <button className={activeView === "overview" ? "nav-item active" : "nav-item"} onClick={() => setActiveView("overview")}><span>◉</span> Overview</button>
          <button className={activeView === "inventory" ? "nav-item active" : "nav-item"} onClick={() => setActiveView("inventory")}><span>◈</span> Inventory</button>
          <button className={activeView === "alerts" ? "nav-item active" : "nav-item"} onClick={() => setActiveView("alerts")}><span>◌</span> Stock alerts <i>{stats.low}</i></button>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-status"><span></span> Local storage active</div>
          <div className="profile-orb">SS</div>
          <div className="profile-copy"><strong>Store Manager</strong><small>Inventory workspace</small></div>
        </div>
      </aside>

      <section className="main-area" id="dashboard">
        <header className="main-header">
          <div>
            <span className="header-eyebrow">INVENTORY CONTROL CENTER</span>
            <h1>{activeView === "alerts" ? "Stock alerts" : activeView === "inventory" ? "Your inventory" : "Good day, manager"}<span>.</span></h1>
            <p>Monitor your products. Keep your business moving.</p>
          </div>
          <div className="header-actions">
            <div className="live-indicator"><span></span> Live inventory</div>
            <button className="add-product-button" onClick={openAddModal}><span>＋</span> Add product</button>
          </div>
        </header>

        <div className="stat-grid">
          <article className="stat-card clay-surface">
            <div className="stat-card-top"><span>Total products</span><span className="stat-icon">◈</span></div>
            <strong>{stats.total}</strong>
            <small>Unique items in catalog</small>
            <div className="stat-orbit orbit-green"></div>
          </article>
          <article className="stat-card clay-surface">
            <div className="stat-card-top"><span>Available units</span><span className="stat-icon">◉</span></div>
            <strong>{stats.units.toLocaleString()}</strong>
            <small>Across all products</small>
            <div className="stat-orbit orbit-lime"></div>
          </article>
          <article className="stat-card clay-surface">
            <div className="stat-card-top"><span>Inventory value</span><span className="stat-icon">₨</span></div>
            <strong className="value-number">{formatCurrency(stats.value)}</strong>
            <small>Based on current quantity</small>
            <div className="stat-orbit orbit-green"></div>
          </article>
          <article className="stat-card clay-surface alert-stat">
            <div className="stat-card-top"><span>Needs attention</span><span className="stat-icon">!</span></div>
            <strong>{stats.low}</strong>
            <small>{stats.out} products out of stock</small>
            <div className="stat-orbit orbit-alert"></div>
          </article>
        </div>

        {activeView === "overview" && (
          <section className="overview-content">
            <div className="content-heading">
              <div><span className="section-label">AT A GLANCE</span><h2>Inventory overview</h2></div>
              <button className="text-action" onClick={() => setActiveView("inventory")}>View all products ↗</button>
            </div>
            <div className="overview-columns">
              <article className="panel clay-surface">
                <div className="panel-heading"><div><span className="section-label">STOCK HEALTH</span><h3>Stock distribution</h3></div><span className="panel-orb">◉</span></div>
                <div className="health-content">
                  <div className="health-ring" style={{ "--healthy": `${stats.total ? ((stats.total - stats.low) / stats.total) * 100 : 0}%` }}>
                    <div><strong>{stats.total ? Math.round(((stats.total - stats.low) / stats.total) * 100) : 0}%</strong><small>Healthy</small></div>
                  </div>
                  <div className="health-legend">
                    <div><span className="legend-dot healthy-dot"></span><span>In stock</span><strong>{stats.total - stats.low}</strong></div>
                    <div><span className="legend-dot low-dot"></span><span>Low stock</span><strong>{products.filter((product) => getStockStatus(product) === "Low stock").length}</strong></div>
                    <div><span className="legend-dot out-dot"></span><span>Out of stock</span><strong>{stats.out}</strong></div>
                  </div>
                </div>
              </article>

              <article className="panel clay-surface">
                <div className="panel-heading"><div><span className="section-label">ACTION REQUIRED</span><h3>Low stock alerts</h3></div><span className="alert-count">{stats.low} alerts</span></div>
                {lowStockProducts.length ? (
                  <div className="alert-list">
                    {lowStockProducts.slice(0, 4).map((product) => (
                      <div className="alert-row" key={product.id}>
                        <span className="alert-product-orb">{product.name.charAt(0)}</span>
                        <div><strong>{product.name}</strong><small>{product.sku}</small></div>
                        <span className={product.quantity === 0 ? "qty-out" : "qty-low"}>{product.quantity} left</span>
                      </div>
                    ))}
                    {lowStockProducts.length > 4 && <button className="text-action" onClick={() => setActiveView("alerts")}>See all alerts ↗</button>}
                  </div>
                ) : <p className="all-clear">All products are above their alert levels. Nice work!</p>}
              </article>
            </div>
          </section>
        )}

        {(activeView === "inventory" || activeView === "overview") && (
          <section className="inventory-section">
            <div className="content-heading">
              <div><span className="section-label">PRODUCT CATALOG</span><h2>{activeView === "overview" ? "Recent products" : "Manage inventory"}</h2></div>
              <button className="reset-button" onClick={resetDemo}>Reset demo</button>
            </div>
            <div className="inventory-toolbar clay-surface">
              <div className="search-field"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search product name or SKU..." /></div>
              <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} aria-label="Filter by category">
                <option>All categories</option>
                {productCategories.map((category) => <option key={category}>{category}</option>)}
              </select>
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter by stock status">
                <option>All stock</option><option>In stock</option><option>Low stock</option><option>Out of stock</option>
              </select>
            </div>
            <div className="products-grid">
              {filteredProducts.length ? filteredProducts.slice(0, activeView === "overview" ? 4 : undefined).map((product) => (
                <ProductCard key={product.id} product={product} onEdit={openEditModal} onDelete={deleteProduct} onAdjust={adjustStock} />
              )) : (
                <div className="no-products clay-surface"><span>◌</span><h3>No matching products</h3><p>Try changing your search or filters.</p><button onClick={() => { setSearch(""); setCategoryFilter("All categories"); setStatusFilter("All stock"); }}>Clear filters</button></div>
              )}
            </div>
            {activeView === "overview" && filteredProducts.length > 4 && <button className="load-more" onClick={() => setActiveView("inventory")}>Explore full inventory <span>↗</span></button>}
          </section>
        )}

        {activeView === "alerts" && (
          <section className="inventory-section alerts-page">
            <div className="content-heading"><div><span className="section-label">RESTOCK WATCH</span><h2>Products that need attention</h2></div></div>
            <p className="alerts-description">These products have reached or fallen below their configured stock threshold.</p>
            {lowStockProducts.length ? (
              <div className="products-grid">
                {lowStockProducts.map((product) => <ProductCard key={product.id} product={product} onEdit={openEditModal} onDelete={deleteProduct} onAdjust={adjustStock} />)}
              </div>
            ) : <div className="all-clear-panel clay-surface"><span>✓</span><h3>Everything looks healthy</h3><p>No products currently need restocking.</p></div>}
          </section>
        )}

        <footer className="app-footer"><span>STOCKSPHERE · DAY 12</span><span>Inventory clarity, one product at a time.</span></footer>
      </section>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <section className="product-modal clay-surface" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <span className="section-label">{editingId !== null ? "UPDATE CATALOG" : "EXPAND YOUR CATALOG"}</span>
            <h2>{editingId !== null ? "Edit product" : "Add a product"}</h2>
            <p>Keep your inventory details accurate and up to date.</p>
            <form onSubmit={saveProduct}>
              <label>Product name<input name="name" value={form.name} onChange={updateForm} required maxLength="60" placeholder="e.g. Wireless Mouse" /></label>
              <div className="form-two">
                <label>SKU<input name="sku" value={form.sku} onChange={updateForm} required maxLength="20" placeholder="e.g. EL-2001" /></label>
                <label>Category<select name="category" value={form.category} onChange={updateForm}>{productCategories.map((category) => <option key={category}>{category}</option>)}</select></label>
              </div>
              <div className="form-two">
                <label>Price (PKR)<input name="price" type="number" min="0" step="1" value={form.price} onChange={updateForm} required /></label>
                <label>Quantity<input name="quantity" type="number" min="0" step="1" value={form.quantity} onChange={updateForm} required /></label>
              </div>
              <label>Low stock alert threshold<input name="threshold" type="number" min="0" step="1" value={form.threshold} onChange={updateForm} required /></label>
              <button className="save-product" type="submit">{editingId !== null ? "Save changes" : "Add to inventory"} <span>↗</span></button>
            </form>
          </section>
        </div>
      )}

      {notice && <div className="stock-toast">{notice}</div>}
    </main>
  );
}