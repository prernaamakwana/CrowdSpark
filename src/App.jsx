// src/App.jsx
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  const { pathname } = useLocation();

  return (
    <div className="bg-primary min-h-screen text-gray-900">
      {/* Conditionally render Navbar everywhere except on the landing page */}
      {pathname !== "/" && <Navbar />}

      {/* This is where route-specific pages will render */}
      <Outlet />
    </div>
  );
}