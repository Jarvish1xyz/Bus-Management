import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";
import { motion } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="backdrop-blur-lg bg-white/30 border-b border-white/20 shadow-md px-6 py-3 flex justify-between items-center"
    >
      {/* Logo */}
      <h1
        onClick={() => navigate("/dashboard")}
        className="text-xl font-bold cursor-pointer text-blue-600"
      >
        Bus System
      </h1>

      {/* Navigation Links */}
      {user?.role === "admin" && (
        <div className="flex gap-4">
          <button onClick={() => navigate("/dashboard")} className="nav-btn">
            Dashboard
          </button>
          <button onClick={() => navigate("/add-place")} className="nav-btn">
            Add Place
          </button>
          <button onClick={() => navigate("/add-driver")} className="nav-btn">
            Add Driver
          </button>
          <button onClick={() => navigate("/add-bus")} className="nav-btn">
            Add Bus
          </button>
          <button onClick={() => navigate("/add-student")} className="nav-btn">
            Add Student
          </button>
        </div>
      )}

      {/* User Info */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700">
          {user?.name} ({user?.role})
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-400 text-white px-3 py-1 rounded-lg"
        >
          Logout
        </button>
      </div>
    </motion.div>
  );
}