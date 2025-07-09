import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaCompass,
  FaPlusCircle,
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // adjust path if needed

export default function Navbar() {
  const { user, logout } = useAuth(); // assumes user has role and login state
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAdminLoggedIn = user && user.role === "admin";

  const navItems = [
    { to: "/explore", icon: <FaCompass />, label: "Explore" },
    { to: "/create", icon: <FaPlusCircle />, label: "Create" },
    { to: "/dashboard", icon: <FaUser />, label: "Dashboard" },
  ];

  return (
    <nav className="bg-accent p-4 shadow-md flex justify-between items-center">
      <div className="text-blue-900 font-bold text-xl flex items-center space-x-2">
        <span>CrowdSpark 💡</span>
      </div>

      <div className="flex items-center space-x-6">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className="relative group text-blue-900 text-xl hover:text-blue-700 transition"
          >
            {item.icon}
            <span className="absolute bottom-[-2.2rem] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none z-10">
              {item.label}
            </span>
          </Link>
        ))}

        {/* 🧠 Conditional Login/Logout Button */}
        {isAdminRoute && isAdminLoggedIn ? (
          <button
            onClick={logout}
            className="relative group text-blue-900 text-xl hover:text-red-700 transition"
          >
            <FaSignOutAlt />
            <span className="absolute bottom-[-2.2rem] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none z-10">
              Logout
            </span>
          </button>
        ) : (
          <Link
            to="/login"
            className="relative group text-blue-900 text-xl hover:text-blue-700 transition"
          >
            <FaSignInAlt />
            <span className="absolute bottom-[-2.2rem] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none z-10">
              Login
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}