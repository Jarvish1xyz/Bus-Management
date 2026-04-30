import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/axiosConfig';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    uName: '',
    uEmail: '',
    uPhone: '',
    aName: '',
    aEmail: '',
    aPass: '',
    aConPass: ''
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.aPass !== formData.aConPass) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);

      // 1. Create University
      const uniRes = await api.post('/api/university', {
        name: formData.uName,
        email: formData.uEmail,
        phone: formData.uPhone
      });

      const universityId = uniRes.data._id;

      // 2. Create Admin
      await api.post('/api/admin', {
        name: formData.aName,
        email: formData.aEmail,
        password: formData.aPass,
        confirmPassword: formData.aConPass,
        university: universityId
      });

      alert("System created successfully 🎉");
      window.location.href = "/login";

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all";

  return (
    <div className="pt-32 pb-20 px-6 flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl bg-white/5 backdrop-blur-3xl border border-white/10 p-12 rounded-[3rem] shadow-2xl"
      >
        <h2 className="text-4xl font-bold mb-10 text-center">
          Setup Your System
        </h2>

        <form onSubmit={handleRegister} className="grid md:grid-cols-2 gap-12">

          {/* UNIVERSITY */}
          <div className="space-y-6">
            <h3 className="text-blue-400 font-bold uppercase tracking-widest text-sm">
              University Details
            </h3>

            <input
              type="text"
              placeholder="University Name"
              className={inputStyle}
              onChange={(e) =>
                setFormData({ ...formData, uName: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="University Email"
              className={inputStyle}
              onChange={(e) =>
                setFormData({ ...formData, uEmail: e.target.value })
              }
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className={inputStyle}
              onChange={(e) =>
                setFormData({ ...formData, uPhone: e.target.value })
              }
            />
          </div>

          {/* ADMIN */}
          <div className="space-y-6 md:border-l md:border-white/10 md:pl-12">
            <h3 className="text-slate-400 font-bold uppercase tracking-widest text-sm">
              Admin Account
            </h3>

            <input
              type="text"
              placeholder="Admin Name"
              className={inputStyle}
              onChange={(e) =>
                setFormData({ ...formData, aName: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Admin Email"
              className={inputStyle}
              onChange={(e) =>
                setFormData({ ...formData, aEmail: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className={inputStyle}
              onChange={(e) =>
                setFormData({ ...formData, aPass: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className={inputStyle}
              onChange={(e) =>
                setFormData({ ...formData, aConPass: e.target.value })
              }
            />

            <button
              disabled={loading}
              className="w-full py-4 bg-blue-600 rounded-2xl font-bold shadow-xl hover:bg-blue-500 transition-all disabled:opacity-50"
            >
              {loading ? "Creating..." : "Deploy System"}
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};

export default RegisterPage;