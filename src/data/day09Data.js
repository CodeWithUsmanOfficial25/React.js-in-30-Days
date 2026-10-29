export const initialTransactions = [
  { id: 1, title: "Monthly salary", category: "Salary", type: "income", amount: 85000, date: "2026-10-01" },
  { id: 2, title: "Apartment rent", category: "Housing", type: "expense", amount: 18000, date: "2026-10-03" },
  { id: 3, title: "Grocery shopping", category: "Food", type: "expense", amount: 6200, date: "2026-10-05" },
  { id: 4, title: "Freelance landing page", category: "Freelance", type: "income", amount: 22000, date: "2026-10-08" },
  { id: 5, title: "Internet bill", category: "Bills", type: "expense", amount: 2500, date: "2026-10-09" },
  { id: 6, title: "Fuel", category: "Transport", type: "expense", amount: 3800, date: "2026-10-11" },
  { id: 7, title: "Coffee with friends", category: "Lifestyle", type: "expense", amount: 1200, date: "2026-10-13" },
  { id: 8, title: "React UI freelance task", category: "Freelance", type: "income", amount: 12000, date: "2026-10-15" },
  { id: 9, title: "University supplies", category: "Education", type: "expense", amount: 2800, date: "2026-10-17" },
  { id: 10, title: "Mobile package", category: "Bills", type: "expense", amount: 900, date: "2026-10-19" },
  { id: 11, title: "Dinner", category: "Food", type: "expense", amount: 1750, date: "2026-10-21" },
  { id: 12, title: "Book purchase", category: "Education", type: "expense", amount: 1600, date: "2026-10-23" }
]

export const categories = [
  "Food", "Housing", "Transport", "Bills", "Education",
  "Lifestyle", "Shopping", "Health", "Salary", "Freelance", "Other"
]

export const expenseCategories = [
  "Food", "Housing", "Transport", "Bills", "Education",
  "Lifestyle", "Shopping", "Health", "Other"
]

export const initialBudgets = {
  Food: 12000,
  Housing: 20000,
  Transport: 7000,
  Bills: 5000,
  Education: 6000,
  Lifestyle: 5000,
  Shopping: 5000,
  Health: 4000,
  Other: 4000
}

export const money = (value) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0
  }).format(value)

export const formatDate = (value) =>
  new Date(value + "T12:00:00").toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric"
  })

export const todayLocal = () => {
  const now = new Date()
  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")
  ].join("-")
}