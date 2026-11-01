# React.js in 30 Days

A practical 30-day React.js learning journey with hands-on projects.

## Day 12 - StockSphere

StockSphere is an intermediate-level inventory management dashboard designed for small businesses and shop owners.

### Features

- Add, edit and delete products
- Manage product names, SKU, category, price and stock quantity
- Increase or decrease stock with circular controls
- Search products by name or SKU
- Filter by category and stock status
- Automatic low-stock and out-of-stock alerts
- Dashboard statistics for products, units and inventory value
- Circular stock-level indicators and stock-health visualization
- Persistent product data using browser localStorage
- Restore the original sample inventory

### Design

- Black and deep forest-green palette
- Claymorphism raised surfaces
- Neumorphic inset search fields and form controls
- Circular buttons, icons and stock indicators
- Space Grotesk and Inter typography
- Responsive dashboard layout

### Tech Stack

- React
- JavaScript
- CSS
- Vite
- Browser localStorage

### Project Structure

```text
src/
├── components/
│   └── day12/
│       └── ProductCard.jsx
├── data/
│   └── day12Data.js
├── days/
│   ├── Day12.jsx
│   └── Day12.css
└── App.jsx
```

### Run Locally

```bash
npm install
npm run dev
```

### Production Build

```bash
npm run build
```

### Data Storage

Products are stored in browser localStorage on the current browser and device. This project does not yet use a server, database, authentication or multi-user synchronization.

---

More projects will be added throughout the 30-day learning journey.