import React from "react";

export default function SearchBar({ value, onChange, placeholder = "Search vehicles..." }) {
  return (
    <label className="showroom-search">
      <span>⌕</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search vehicles"
      />
      {value && <button type="button" onClick={() => onChange("")}>×</button>}
    </label>
  );
}
