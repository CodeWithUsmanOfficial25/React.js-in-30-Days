# React.js in 30 Days

A hands-on React learning journey featuring daily projects, reusable components, responsive interfaces, and practical React patterns.

## Project Goals

- Build practical React projects instead of only collecting notes.
- Practice component composition and clean project structure.
- Improve JavaScript and React skills through daily implementation.
- Maintain a public GitHub development history.
- Build responsive, interactive interfaces using reusable components.
- Explore different project niches, visual identities, and UI patterns.

## Daily Progress

| Day | Focus | Status |
|---|---|---|
| Day 01 | React project foundation and introductory UI | Completed |
| Day 02 | JSX expressions, rendering, arrays, reusable components, and conditional rendering | Completed |
| Day 03 | Props, event handling, `useState`, search, filtering, and interactive UI | Completed |
| Day 04 | Controlled forms, form validation, task management, and state updates | Completed |
| Day 05 | Interactive habit tracker, completion progress, filters, and responsive UI | Completed |
| Day 06 | FocusFlow Pomodoro timer, session controls, task checklist, and responsive UI | Completed |
| Day 07 | PixelForge creative portfolio, project search, category filters, saved projects, and grid/list views | Completed |
| Day 08 | Roamly travel discovery, destination search, category filters, sorting, saved places, and destination details | Completed |
| Day 09–30 | Upcoming React concepts and projects | Planned |

## Day 01 Features

- Initial React project setup with Vite.
- Introductory React component and styling.
- Organized day-specific source files.

## Day 02 Features

- Structured learning data in a separate JavaScript file.
- Reusable topic cards and status badges.
- Component-based dashboard layout.
- Responsive styling with a dark and lime-green color scheme.

## Day 03 Features

- Interactive topic cards and `useState`.
- Dynamic completion progress indicator.
- Search topics by title, category, or description.
- Filter topics by status and reset learning progress.
- Responsive dark and electric-cyan visual theme.

## Day 04 Features

- Study planner with sample learning tasks.
- Reusable form-field and task-card components.
- Add tasks with a title, topic, and priority.
- Validate task titles before submission.
- Mark tasks as completed or pending.
- Filter tasks and calculate completion progress dynamically.
- Responsive cream-and-terracotta visual theme.

## Day 05 Features

- Interactive daily habit tracker.
- Mark habits as completed or pending.
- Dynamic completion percentage and progress bar.
- Habit statistics, category filtering, and completion summaries.
- Reset habit progress.
- Responsive cards with coral and turquoise accents.

## Day 06 Features — FocusFlow

- Interactive Pomodoro timer for focused work sessions.
- Start, pause, and reset controls.
- Focus, short-break, and long-break modes.
- Session progress and completion feedback.
- Add and complete tasks using an interactive checklist.
- Responsive bright design with lavender, orange, lime, and warm white.
- Typography using Space Grotesk and Outfit.

## Day 07 Features — PixelForge

- Creative portfolio and project gallery.
- Reusable project cards powered by props.
- Separate project data and component files.
- Search projects by title, category, description, or tags.
- Filter projects by category.
- Save and unsave favorite projects.
- Filter the gallery to show saved projects.
- Switch between grid and list layouts.
- Empty state and reset filters.
- Responsive cinematic glassmorphism design with layered gradients and translucent project cards.

## Day 08 Features — Roamly

- Travel discovery interface featuring curated destinations.
- Reusable destination cards powered by props.
- Separate destination data and UI component files.
- Search destinations by name, country, category, or region.
- Filter destinations by travel category.
- Sort destinations by rating or estimated daily price.
- Save and unsave favorite destinations.
- Filter the gallery to display saved places.
- Interactive destination details modal.
- Destination ratings, suggested trip duration, and seasonal information.
- Empty state and filter reset functionality.
- Responsive editorial design with warm ivory, terracotta, ocean blue, and nature-inspired accents.
- Typography using Playfair Display and DM Sans.
- Dynamic filtering and sorting using `useMemo` and React state.

*Destination prices are illustrative estimates, not live travel quotes. Destination photography is loaded from Unsplash and requires an internet connection.*

## Project Structure

```text
src/
├── components/
│   ├── day02/
│   ├── day04/
│   ├── day07/
│   │   └── ProjectCard.jsx
│   └── day08/
│       └── DestinationCard.jsx
├── data/
│   ├── day02Data.js
│   ├── day03Data.js
│   ├── day04Data.js
│   ├── day08Data.js
│   └── day08Stats.js
├── days/
│   ├── Day01.jsx
│   ├── Day01.css
│   ├── Day02.jsx
│   ├── Day02.css
│   ├── Day03.jsx
│   ├── Day03.css
│   ├── Day04.jsx
│   ├── Day04.css
│   ├── Day05.jsx
│   ├── Day05.css
│   ├── Day06.jsx
│   ├── Day06.css
│   ├── Day07.jsx
│   ├── Day07.css
│   ├── Day08.jsx
│   └── Day08.css
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

*This is a representative structure. Existing files, components, and data for earlier days are retained in the repository.*

## Run Locally

Clone the repository:

```bash
git clone https://github.com/CodeWithUsmanOfficial25/React.js-in-30-Days.git
cd React.js-in-30-Days
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Tech Stack

- React
- JavaScript (ES6+)
- JSX
- React Hooks, including `useState`, `useEffect`, and `useMemo`
- Vite
- CSS
- Git and GitHub

## Learning Approach

Each day focuses on practical implementation rather than notes alone. Projects use reusable components, separate data files, interactive state, and day-specific styling where appropriate.

The visual direction changes throughout the journey to explore different design styles, layouts, project niches, and React patterns. The goal is to develop practical skills while building a public portfolio of working projects.

---

Built while learning React, one day at a time.
