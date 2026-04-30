import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AddPlace from "./pages/AddPlace";
import AddDriver from "./pages/AddDriver";
import AddBus from "./pages/AddBus";
import AddStudent from "./pages/AddStudent";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
        {/* Deep background glass effect layers */}
        <div className="fixed inset-0 overflow-hidden -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px]" />
        </div>

        {/* <Navbar /> */}

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/add-place" element={
            <ProtectedRoute role="admin">
              <AddPlace />
            </ProtectedRoute>
          } />

          <Route path="/add-driver" element={
            <ProtectedRoute role="admin">
              <AddDriver />
            </ProtectedRoute>
          } />

          <Route path="/add-bus" element={
            <ProtectedRoute role="admin">
              <AddBus />
            </ProtectedRoute>
          } />

          <Route path="/add-student" element={
            <ProtectedRoute role="admin">
              <AddStudent />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;