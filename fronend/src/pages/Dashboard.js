import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Welcome, {user.name}
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Role Badge */}
      <div className="mb-6">
        <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
          {user.role.toUpperCase()}
        </span>
      </div>

      {/* CONTENT BASED ON ROLE */}
      {user.role === "admin" && <AdminPanel />}
      {user.role === "driver" && <DriverPanel />}
      {user.role === "student" && <StudentPanel />}
    </div>
  );
};

export default Dashboard;





// ================= ADMIN =================
const AdminPanel = () => {
  const navigate = useNavigate();

  const actions = [
    { title: "Add Driver", path: "/add-driver" },
    { title: "Add Bus", path: "/add-bus" },
    { title: "Add Student", path: "/add-student" },
    { title: "Add Place", path: "/add-place" },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate(action.path)}
          className="cursor-pointer bg-slate-800 p-6 rounded-xl shadow-lg hover:bg-slate-700 transition"
        >
          <h2 className="text-lg font-semibold">{action.title}</h2>
        </motion.div>
      ))}
    </div>
  );
};





// ================= DRIVER =================
const DriverPanel = () => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-3">Driver Dashboard</h2>
      <p className="text-slate-300">
        View assigned bus, routes, and schedule.
      </p>
    </div>
  );
};





// ================= STUDENT =================
const StudentPanel = () => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-3">Student Dashboard</h2>
      <p className="text-slate-300">
        View your bus, pickup point, and timings.
      </p>
    </div>
  );
};