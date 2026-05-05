// src/pages/LoginPage.js
import React, { useState } from 'react';
import AdminLogin from '../components/Auth/AdminLogin';
import DriverLogin from '../components/Auth/DriverLogin';
import StudentLogin from '../components/Auth/StudentLogin';

const LoginPage = ({ onLoginSuccess }) => {
  const [role, setRole] = useState('admin'); // admin, driver, student

  const roles = [
    { id: 'admin', label: 'Admin' },
    { id: 'driver', label: 'Driver' },
    { id: 'student', label: 'Student' }
  ];

  const getActiveIndex = () => roles.findIndex(r => r.id === role);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
        <h2 className="text-3xl font-black text-slate-800 mb-8 text-center">Login</h2>

        {/* Sliding Role Selector */}
        <div className="relative flex bg-slate-100 p-1 rounded-2xl mb-8">
          <div
            className="absolute top-1 bottom-1 bg-white rounded-xl shadow-sm transition-all duration-300 ease-out"
            style={{
              width: 'calc(33.33% - 4px)',
              left: `calc(${getActiveIndex() * 33.33}% + 2px)`
            }}
          />
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className={`relative z-10 w-1/3 py-2 text-sm font-bold transition-colors duration-300 ${role === r.id ? 'text-blue-600' : 'text-slate-400'}`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Dynamic Forms */}
        {role === 'admin' && <AdminLogin onLoginSuccess={onLoginSuccess} />}
        {role === 'driver' && <DriverLogin onLoginSuccess={onLoginSuccess} />}
        {role === 'student' && <StudentLogin onLoginSuccess={onLoginSuccess} />}
      </div>
    </div>
  );
};

export default LoginPage;