import React, { useState } from 'react';
import API from '../api';
import { useNotice } from '../NoticeContext';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const { triggerNotice } = useNotice();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    uniName: "", uniEmail: "", uniPhone: "",
    adminName: "", adminEmail: "", password: "", confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDeploy = async () => {
    if (formData.password !== formData.confirmPassword) {
      return triggerNotice("Passwords do not match", "error");
    }
    setLoading(true);
    try {
      // 1. Create University
      const uniRes = await API.post("/api/university", {
        name: formData.uniName,
        email: formData.uniEmail,
        phone: formData.uniPhone,
      });
      
      const universityId = uniRes.data._id;
      
      // 2. Create Admin
      await API.post("/api/admin", {
        name: formData.adminName,
        email: formData.adminEmail,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        university: universityId,
      });

      triggerNotice("System Deployed Successfully!", "success");
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8]  relative overflow-hidden">
      {/* Decorative Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-sky-400/20 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-5xl z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Deploy Your <span className="text-blue-600">Transit System</span></h1>
          <p className="text-slate-500 font-medium mt-2">Set up your university workspace in seconds.</p>
        </div>

        {/* Main Glass Container */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden">
          <div className="flex flex-col md:flex-row">

            {/* Left Section: University */}
            <div className="flex-1 p-10 md:p-14 border-b md:border-b-0 md:border-r border-slate-200/50">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">1</div>
                <h2 className="text-2xl font-bold text-slate-800">University Details</h2>
              </div>
              <div className="space-y-5">
                <AuthField name="uniName" placeholder="University Name" onChange={handleChange} />
                <AuthField name="uniEmail" placeholder="Official Email" type="email" onChange={handleChange} />
                <AuthField name="uniPhone" placeholder="Contact Number" onChange={handleChange} />
              </div>
            </div>

            {/* Right Section: Admin */}
            <div className="flex-1 p-10 md:p-14 bg-white/30">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-white font-bold">2</div>
                <h2 className="text-2xl font-bold text-slate-800">Super Admin</h2>
              </div>
              <div className="space-y-5">
                <AuthField name="adminName" placeholder="Full Name" onChange={handleChange} />
                <AuthField name="adminEmail" placeholder="Admin Email" type="email" onChange={handleChange} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <AuthField name="password" placeholder="Password" type="password" onChange={handleChange} />
                  <AuthField name="confirmPassword" placeholder="Confirm" type="password" onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Area */}
          <div className="p-8 bg-slate-50/50 border-t border-slate-200/50 flex flex-col items-center">
            <button
              onClick={handleDeploy}
              disabled={loading}
              className="group relative px-16 py-5 bg-blue-600 rounded-2xl font-black text-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-70"
            >
              <span className="flex items-center gap-3">
                {loading ? "DEPLOYING..." : "DEPLOY SYSTEM"}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <p className="mt-4 text-sm text-slate-400 font-bold uppercase tracking-widest">Enterprise Ready Architecture</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Styled Field
const AuthField = ({ name, placeholder, type = "text", onChange }) => (
  <div className="relative group">
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full px-6 py-4 bg-white/50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold text-slate-700 placeholder:text-slate-400"
    />
  </div>
);

export default RegistrationPage;