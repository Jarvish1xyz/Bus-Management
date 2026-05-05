// src/pages/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] p-4 text-center">
      <div className="max-w-2xl space-y-8 p-12 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
        <h1 className="text-5xl font-black text-slate-800 tracking-tight">
          Bus <span className="text-blue-600">Management</span> System
        </h1>
        <p className="text-slate-500 text-lg font-medium">
          The ultimate solution for tracking, scheduling, and managing university transit.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <button 
            onClick={() => navigate('/login')}
            className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
          >
            Go to Portal
          </button>
          <button 
            onClick={() => navigate('/register')}
            className="px-10 py-4 border-2 border-blue-600 text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition-all active:scale-95"
          >
            Register University
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;