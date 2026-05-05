import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

// Admin Pages
import AddPlace from "./pages/admin/AddPlace";
import AddDriver from "./pages/admin/AddDriver";
import AddBus from "./pages/admin/AddBus";
import AddStudent from "./pages/admin/AddStudent";

// Components
import ProtectedRoute from "./component/ProtectedRoute";

// Utils
import { getUser } from "./utils/auth";

function App() {
  const user = getUser();

  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-place"
          element={
            <ProtectedRoute role="admin">
              <AddPlace />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-driver"
          element={
            <ProtectedRoute role="admin">
              <AddDriver />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-bus"
          element={
            <ProtectedRoute role="admin">
              <AddBus />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-student"
          element={
            <ProtectedRoute role="admin">
              <AddStudent />
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown routes */}
        <Route
          path="*"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />

      </Routes>
    </Router>
  );
}

export default App;