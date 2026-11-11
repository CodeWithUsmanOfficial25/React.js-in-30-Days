import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Day18 from "./days/Day18";
import Day19 from "./days/Day19";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Day19 />} />
        <Route path="/destinations/:slug" element={<Day19 />} />
        <Route path="/about" element={<Day19 />} />
        <Route path="/contact" element={<Day19 />} />
        <Route path="/day18" element={<Day18 />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
