import { motion } from "framer-motion";
import GlassCard from "../component/GlassCard";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <GlassCard>
        <h1 className="text-3xl font-bold mb-4">Bus Management System</h1>
        <p className="mb-6 text-gray-700">
          Manage buses, drivers, and students efficiently
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Register
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg"
          >
            Login
          </button>
        </div>
      </GlassCard>
    </div>
  );
}