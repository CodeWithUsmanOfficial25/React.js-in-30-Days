# React.js in 30 Days

A practical 30-day React.js learning journey featuring hands-on projects.

## Day 11 - MoodCanvas

MoodCanvas is a personal mood tracker and journal built with React. It gives users a simple space to record daily feelings and review their mood history.

### Features

- Four circular mood selectors: Happy, Calm, Neutral and Sad
- Daily mood check-in with a personal journal note
- Save a new entry or update today's entry
- Mood statistics and mood balance score
- Filter journal history by mood
- Delete individual journal entries
- Reset the sample journal
- Responsive glassmorphism interface

### Design

- Soft lavender, rose, peach and blue gradients
- Translucent glass cards and blurred ambient backgrounds
- Circular mood selection controls
- Syne and Nunito Sans typography

### Tech Stack

- React
- JavaScript
- CSS
- Vite

### Project Structure

```text
src/
├── components/
│   └── day11/
│       ├── MoodOption.jsx
│       └── MoodEntry.jsx
├── data/
│   └── day11Data.js
├── days/
│   ├── Day11.jsx
│   └── Day11.css
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

### Note

This project uses local React state and sample journal entries. Entries are not stored in a backend or database and will reset when the page is refreshed.

---

More projects will be added throughout the 30-day journey.