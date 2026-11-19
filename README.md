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
## Day 16 — ArcadeVerse | 3D Gaming Arena

A bold gaming arcade experience built with React and CSS, combining interactive mini-games, 3D-inspired visuals, claymorphism, and neumorphic interface elements.

### Features
- 3D-inspired gaming dashboard with a floating controller illustration
- Animated orbital rings, floating elements, and scrolling arcade ticker
- Orange, graphite, and warm grey visual theme
- Claymorphism and neumorphic surfaces with layered depth and soft shadows
- Interactive game selection cards with 3D hover transformations
- Memory Matrix game with randomized cards, matching pairs, move counter, and scoring
- Reaction Rush game with random signal timing and reaction measurement
- Personal best reaction time tracking during the session
- Live player statistics and game progress display
- Restart functionality for mini-games
- Modal-based gameplay experience
- Responsive layout for desktop, tablet, and mobile
- Reduced-motion accessibility support

### Tech
- React
- Vite
- JavaScript ES6+
- CSS3 and CSS 3D transforms
- CSS keyframe animations
- React useState, useEffect, and useRef
- Component-based architecture

### Concepts Practiced
- Reusable components and props
- State management and conditional rendering
- Dynamic list rendering
- Event handling
- Timers and cleanup with useEffect
- React refs for tracking reaction timing
- Array methods for game logic
- Derived statistics and score calculations
- Responsive and accessible UI design

### Project Structure
```text
src/
├── components/
│   └── day16/
│       └── GameCard.jsx
├── data/
│   └── day16Data.js
├── days/
│   ├── Day16.jsx
│   └── Day16.css
└── App.jsx
```

### Run
```bash
npm install
npm run dev
```

Note: ArcadeVerse is a frontend gaming concept/demo. Game scores and personal bests are maintained locally during the current session and are not saved to a backend or database. Pixel Quest and Cyber Drift are preview cards for future game experiences.

**Status:** Completed — Day 16 of 30

---

## Day 17 - 3D Cosmic Galaxy

An immersive 3D cosmic experience built with React, Vite and Three.js.

### Features
- Interactive 3D spiral galaxy with thousands of particles
- Glowing central star and animated orbital rings
- Floating planet and deep-space starfield
- Mouse-responsive camera movement
- Animated cosmic interface with blue and orange accents
- Discovery cards, responsive layout and cinematic styling

### Technologies
- React
- Vite
- Three.js
- JavaScript
- CSS

### Run locally
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
```

## Day 18 — Vanta Motors | Interactive Vehicle Showroom

A premium vehicle discovery experience built with React and CSS. Vanta Motors organizes multiple vehicle categories into dedicated dashboards, with individual model details and selectable configurations.

### Features

- Dedicated main vehicle dashboard with seven vehicle categories
- Separate category dashboard for Cars, Motorcycles, Buses, Bicycles, SUVs, Trucks, and Electric Vehicles
- Six vehicle models in every category
- Individual vehicle cards with online vehicle photography
- Dedicated model detail view for every selected vehicle
- Three selectable configurations for every model: Standard, Premium, and Performance
- Dynamic specifications including engine, power, transmission, and variant features
- Live search within the selected vehicle category
- Category and model navigation with back controls
- Responsive layouts for desktop, tablet, and mobile screens
- Claymorphism and neumorphic card surfaces
- Layered shadows, soft highlights, image hover effects, and subtle animations
- Reduced-motion accessibility support
- Remote image URLs with fallback images

### Tech Stack

- React.js
- Vite
- JavaScript (ES6+)
- CSS3
- React Hooks (`useState`, `useEffect`, `useMemo`)
- Component-Based Architecture
- Responsive Web Design

### Key Concepts Practiced

- Creating reusable React components
- Managing navigation between dashboard views
- State management with `useState`
- Handling keyboard events and cleanup with `useEffect`
- Filtering data with `filter()`
- Optimizing derived data with `useMemo`
- Rendering dynamic collections with `map()`
- Passing data and event handlers through props
- Conditional rendering
- Working with structured JavaScript data
- Building interactive variant selectors
- Responsive CSS layouts and accessible motion preferences

### Project Structure

```text
src/
├── components/
│   └── day18/
│       ├── CategoryFilter.jsx
│       ├── SearchBar.jsx
│       ├── VehicleCard.jsx
│       └── VehicleModal.jsx
├── data/
│   └── day18Data.js
├── days/
│   ├── Day18.jsx
│   └── Day18.css
└── App.jsx
```

### Run Locally

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

### Project Overview

Vanta Motors demonstrates a multi-level vehicle browsing experience. Users start from the vehicle category dashboard, open a dedicated dashboard for a category, explore its models, and view a selected model's specifications and variants.

**Note:** This is a frontend concept/demo. Vehicle prices and specifications are illustrative sample data, not live dealership listings. Vehicle photographs are loaded from external image URLs and require an internet connection.

**Status:** Completed — Day 18 of 30

---

## Day 19 — ATLAS Travel Discovery Platform

- React Router navigation and dynamic destination routes.
- 12 curated travel destinations across multiple regions.
- 60 destination photographs and 8 homepage visual assets.
- Search and region filters for destination discovery.
- Destination detail pages with five-image galleries.
- About page, contact form UI and responsive layouts.
- Local image assets stored in `public/images/day19/`.

Run with `npm run dev`. Homepage: `/` | Day 18: `/day18`.

## Day 20 — BLOOMSCAPE
- Nature-inspired immersive landing page
- Full-screen cherry blossom forest hero using a direct Pexels image URL
- Continuous falling sakura petals with CSS 3D transforms
- Animated forest background and floating elements
- Botanical discovery cards with 3D hover interactions
- Responsive layout and mobile navigation
- Forest green, warm brown, cream and blossom pink palette


## Day 21 — AQUARIA: 3D Ocean Discovery Experience

- Built an interactive marine-life discovery experience with habitat filters and species search.
- Added a cinematic ocean hero, underwater gallery, conservation section and species detail modal.
- Used claymorphism and neumorphism with a fresh midnight-ocean, aqua and coral palette.
- Added 3D tilt interactions, floating depth elements, animated bubbles, parallax and responsive layouts.

## Day 22 - WILDORA: 3D Wildlife Explorer

- Theme: Wildlife discovery and conservation
- Palette: Deep Forest Green, Golden Amber, Warm Ivory
- Design: Claymorphism, neumorphism and layered 3D cards
- Interactions: Species search, habitat filters and animal detail modal
- Visuals: Wildlife photography, animated hero, floating elements and image gallery
- Responsive: Desktop, tablet and mobile layouts

## Day 23 - AEROLITH: 3D Aviation Explorer

- Theme: Aircraft discovery and aviation engineering
- Palette: Midnight Navy, Electric Cyan, Flight Orange
- Design: Claymorphism, neumorphism and layered 3D cards
- Interactions: Aircraft search, category filters, aircraft specification modal and rotating flight facts
- Visuals: Aviation photography, animated hero, floating elements and gallery
- Responsive: Desktop, tablet and mobile layouts

## Day 24 - OPSTRACK: Engineering Delivery & Project Operations

A professional frontend project operations workspace featuring an interactive Kanban board, task creation, priority filtering, team workload, sprint progress, and activity feed.

### Features
- Interactive task board with four workflow stages
- Create, move, search, filter, and delete tasks
- Team workload and sprint progress dashboard
- Responsive SaaS workspace layout
- Graphite, electric blue, and acid lime design system
- React state-driven interactions

### Stack
React, Vite, JavaScript, CSS


## Day 25 - CLOUDMETER: Cloud Cost Intelligence & FinOps Platform

A professional cloud financial operations interface for monitoring infrastructure spending, budgets, service costs, resource inventory, and optimization opportunities.

### Features
- Cloud expenditure analytics and visual spending chart
- Monthly and quarterly period switching
- Editable budget and budget utilization alerts
- Service spending breakdown with category and region filters
- Cost optimization recommendations with apply and dismiss actions
- Resource inventory with search and status filtering
- Downloadable CSV resource report
- Responsive enterprise interface

### Stack
React, Vite, JavaScript, CSS

Note: This is a frontend demonstration using sample cloud billing and resource data. It does not connect to a real cloud provider or execute infrastructure changes.


## Day 26 — THREATDESK: Security Operations & Incident Response

- Built a professional cybersecurity operations console.
- Added threat metrics, severity distribution and network telemetry visualization.
- Implemented searchable and filterable incident queue.
- Added interactive incident investigation and resolution workflow.
- Added simulated network topology and security event audit trail.
- Added responsive layouts, glass surfaces, clay-style cards and animated interactions.
- Technologies: React, JavaScript, CSS, SVG.
- This is a frontend demonstration using sample security data. It does not connect to real infrastructure or execute real security actions.

## Day 27 — TERRAFLUX
3D-inspired planetary eco-tech command center featuring kinetic typography, animated Earth, orbital rings, moving network routes, interactive energy controls, claymorphism and neumorphism.
