# React.js in 30 Days

A hands-on React journey featuring a complete, interactive mini-project for each learning day.

## Day 09 — SpendWise

SpendWise is a responsive personal finance dashboard built with React. It helps users explore income, expenses, transactions, and monthly category budgets using sample data.

### Features

- Overview dashboard with balance, income, expenses, and savings rate
- Add and delete income or expense transactions
- Transaction search and filters for type and category
- Monthly budgets for nine expense categories
- Spending progress indicators and overspending insights
- Editable budgets with validation
- Resettable demo data
- Responsive desktop, tablet, and mobile layout
- Pakistani rupee formatting
- Reusable transaction item and metric components

### Tech stack

- React
- Vite
- JavaScript
- CSS
- React hooks: useState and useMemo

### Run locally

1. Install Node.js.
2. Clone this repository.
3. Open the project folder in a terminal.
4. Install dependencies:

   ``bash
   npm install
   ``

5. Start the development server:

   ``bash
   npm run dev
   ``

6. Open the local URL printed by Vite.

### Production build

``bash
npm run build
``

### Project structure

``text
src/
  components/
    day09/
      TransactionItem.jsx
  data/
    day09Data.js
  days/
    Day09.jsx
    Day09.css
  App.jsx
``

### Data and privacy

This is a learning project using local sample data. It does not connect to a bank, store data on a server, or provide financial advice. Transactions and budget changes reset when the page is refreshed.

## Learning roadmap

- Day 01 — React foundations
- Day 02 — Reusable UI components
- Day 03 — Interactive learning dashboard
- Day 04 — Study planner
- Day 05 — Habit tracker
- Day 06 — FocusFlow Pomodoro timer
- Day 07 — PixelForge portfolio gallery
- Day 08 — Roamly travel discovery
- Day 09 — SpendWise personal finance dashboard