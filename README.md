# React.js in 30 Days

A hands-on React learning journey featuring daily projects, reusable components, responsive interfaces, and practical React patterns.

## Project Goals

- Build practical React projects instead of only collecting notes.
- Practice component composition and clean project structure.
- Improve JavaScript and React skills through daily implementation.
- Maintain a public GitHub development history.
- Build responsive, interactive interfaces using reusable components.

## Daily Progress

| Day | Focus | Status |
|---|---|---|
| Day 01 | React project foundation and introductory UI | Completed |
| Day 02 | JSX expressions, rendering, arrays, reusable components, and conditional rendering | Completed |
| Day 03 | Props, event handling, `useState`, search, filtering, and interactive UI | Completed |
| Day 04 | Controlled forms, form validation, task management, and state updates | Completed |
| Day 05 | Interactive habit tracker, completion progress, filters, and responsive UI | Completed |
| Day 06 | FocusFlow Pomodoro timer, session controls, task checklist, and responsive UI | Completed |
| Day 07–30 | Upcoming React concepts and projects | Planned |

## Day 01 Features

- Initial React project setup with Vite
- Introductory React component and styling
- Organized day-specific source files

## Day 02 Features

- Structured learning data in a separate JavaScript file
- Reusable topic cards and status badges
- Component-based dashboard layout
- Responsive styling with a dark and lime-green color scheme

## Day 03 Features

- Interactive topic cards
- React state updates with `useState`
- Dynamic completion progress indicator
- Search topics by title, category, or description
- Filter topics by status
- Reset learning progress
- Responsive layout with a dark and electric-cyan visual theme

## Day 04 Features

- Study planner with sample learning tasks
- Reusable form-field and task-card components
- Add tasks with a title, topic, and priority
- Validate task titles before submission
- Mark tasks as completed or pending
- Filter tasks by completion status
- Calculate task completion progress dynamically
- Responsive layout with a warm cream-and-terracotta visual theme

## Day 05 Features

- Interactive daily habit tracker
- Mark habits as completed or pending
- Dynamic completion percentage and progress bar
- Habit statistics and completion summaries
- Category-based filtering
- Option to filter completed habits
- Reset habit progress
- Responsive habit cards and dashboard layout
- Dark background with colorful cards, coral accents, and turquoise progress indicators

## Day 06 Features — FocusFlow

- Interactive Pomodoro timer for focused work sessions
- Start, pause, and reset timer controls
- Focus, short-break, and long-break modes
- Session progress and completion feedback
- Task checklist with the ability to add and complete tasks
- Session tracking and focus statistics
- Responsive layout for different screen sizes
- Bright visual identity featuring lavender, vivid orange, lime, and warm white
- Distinct typography using Space Grotesk and Outfit

## Project Structure

```text
src/
├── components/
│   ├── day02/
│   │   ├── StatusBadge.jsx
│   │   └── TopicCard.jsx
│   ├── day04/
│   │   ├── FormField.jsx
│   │   └── TaskCard.jsx
│   ├── day05/
│   │   └── (existing Day 5 component files)
│   └── day06/
│       └── FocusTask.jsx
├── data/
│   ├── day02Data.js
│   ├── day03Data.js
│   ├── day04Data.js
│   └── day06Data.js
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
│   └── Day06.css
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

*Note: This structure highlights the known project files. Keep all existing files, and adjust the tree if your local filenames differ.*

## Run Locally

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
- Vite
- CSS
- Git and GitHub

## Learning Approach

Each day focuses on practical implementation rather than notes alone. Projects are organized into reusable components, separate data files, and day-specific styling where appropriate.

The visual design evolves throughout the journey, with distinct color palettes and layouts for different projects. The repository will continue to grow as new React concepts, interactive features, and projects are completed.

---

Built while learning React, one day at a time.
