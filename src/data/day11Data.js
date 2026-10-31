export const moodOptions = [
  { id: "happy", label: "Happy", emoji: "☀️", color: "#ffb86b", description: "Feeling bright and positive" },
  { id: "calm", label: "Calm", emoji: "🌿", color: "#82cdb8", description: "Peaceful and balanced" },
  { id: "neutral", label: "Neutral", emoji: "☁️", color: "#a9a5e8", description: "Taking things as they come" },
  { id: "sad", label: "Sad", emoji: "🌧️", color: "#8eb8e8", description: "A little low today" }
];

export const initialEntries = [
  { id: 1, mood: "happy", note: "Finished my work and enjoyed a beautiful evening walk.", date: "2026-10-31", createdAt: "09:30 AM" },
  { id: 2, mood: "calm", note: "Spent some quiet time reading and taking a break from screens.", date: "2026-10-30", createdAt: "08:15 PM" },
  { id: 3, mood: "neutral", note: "An ordinary day. Made steady progress on a few tasks.", date: "2026-10-29", createdAt: "06:45 PM" },
  { id: 4, mood: "happy", note: "Had a lovely conversation with a friend today.", date: "2026-10-28", createdAt: "07:20 PM" },
  { id: 5, mood: "sad", note: "Felt a little overwhelmed, so I gave myself some time to rest.", date: "2026-10-27", createdAt: "09:10 PM" }
];

export const getMood = (id) => moodOptions.find((mood) => mood.id === id);

export const formatDate = (date) =>
  new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });