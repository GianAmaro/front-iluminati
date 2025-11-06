import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import HomePage from "./pages/HomePage";
import DashboardPageDemo from "./pages/DashboardPage.demo";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPageDemo />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
