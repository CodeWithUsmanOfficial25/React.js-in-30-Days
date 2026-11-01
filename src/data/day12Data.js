export const initialProducts = [
  { id: 1, name: "Wireless Keyboard", sku: "KB-2041", category: "Electronics", price: 2499, quantity: 24, threshold: 8 },
  { id: 2, name: "Ceramic Coffee Mug", sku: "HM-1028", category: "Home", price: 850, quantity: 6, threshold: 10 },
  { id: 3, name: "USB-C Hub", sku: "EL-3092", category: "Electronics", price: 3299, quantity: 17, threshold: 5 },
  { id: 4, name: "Canvas Backpack", sku: "AC-4015", category: "Accessories", price: 4200, quantity: 3, threshold: 6 },
  { id: 5, name: "Desk Organizer", sku: "HM-1077", category: "Home", price: 1250, quantity: 32, threshold: 8 },
  { id: 6, name: "Bluetooth Speaker", sku: "EL-3018", category: "Electronics", price: 5600, quantity: 11, threshold: 5 },
  { id: 7, name: "Leather Wallet", sku: "AC-4050", category: "Accessories", price: 1850, quantity: 0, threshold: 4 },
  { id: 8, name: "LED Desk Lamp", sku: "HM-1091", category: "Home", price: 2750, quantity: 14, threshold: 5 }
];

export const productCategories = ["Electronics", "Home", "Accessories", "Office"];

export const getStockStatus = (product) => {
  if (product.quantity === 0) return "Out of stock";
  if (product.quantity <= product.threshold) return "Low stock";
  return "In stock";
};

export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0
  }).format(amount);