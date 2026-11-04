## Day 15 — Harvestly | Fresh Grocery Marketplace

A modern grocery shopping experience built with React and CSS, featuring a clean farm-inspired interface, interactive product discovery, and a functional shopping basket.

### Features

- Premium grocery marketplace landing page with a fresh, nature-inspired design
- Dynamic product catalog featuring 12 grocery products
- Product categorization across Fruits, Vegetables, Dairy, and Bakery
- Interactive category filtering for easy product discovery
- Live product search with instant filtering
- Multiple sorting options:
  - Featured products
  - Price: Low to High
  - Price: High to Low
  - Top Rated
- Reusable product cards with pricing, ratings, categories, and product details
- Interactive favorites system with live favorites counter
- Functional shopping cart with add and remove controls
- Dynamic product quantity management
- Automatic cart subtotal and total price calculation
- Free delivery display
- Interactive cart sidebar with empty and populated states
- Responsive layout optimized for desktop, tablet, and mobile screens
- Custom promotional sections and product-focused UI elements
- CSS transitions, hover effects, and modern visual styling

### Tech Stack

- React.js
- Vite
- JavaScript (ES6+)
- CSS3
- React Hooks (`useState`, `useMemo`)
- Component-Based Architecture
- Responsive Web Design

### Key Concepts Practiced

- Building reusable React components
- Managing application state with `useState`
- Optimizing derived data using `useMemo`
- Rendering dynamic lists with `map()`
- Filtering and sorting product collections
- Handling user interactions through event handlers
- Managing shopping cart data using JavaScript objects
- Passing data and functions through props
- Conditional rendering
- Creating responsive interfaces with CSS media queries

### Project Structure

```text
src/
├── components/
│   └── day15/
│       └── ProductCard.jsx
├── data/
│   └── day15Data.js
├── days/
│   ├── Day15.jsx
│   └── Day15.css
└── App.jsx
```

### Run Locally

```bash
npm install
npm run dev
```

### Project Overview

Harvestly demonstrates how React can be used to build an interactive grocery marketplace with dynamic product management, reusable components, and client-side shopping cart functionality.

**Note:** This is a frontend concept/demo. Checkout is simulated locally and does not process real payments or connect to a backend or payment gateway.

**Status:** Completed — Day 15 of 30