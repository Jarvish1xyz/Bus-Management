import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-20 px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-6xl md:text-7xl font-black leading-tight mb-6">
            Smart <span className="text-blue-500">Bus</span> <br />
            Management <span className="text-slate-400">System</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl mb-10 leading-relaxed">
            Manage your university transport system with precision.
            Add drivers, assign buses, define routes and give real-time clarity
            to students and staff.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-4 bg-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/20"
            >
              Get Started
            </button>
          </div>
        </motion.div>

        {/* RIGHT */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard icon={<ShieldCheck className="text-blue-400" />} title="Secure" val="100%" />
          <StatCard icon={<Truck className="text-blue-400" />} title="Fleet Control" val="Unlimited" />
          <div className="col-span-2 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem]">
            <h3 className="text-xl font-bold mb-2">Centralized Control</h3>
            <p className="text-slate-500 italic">
              Manage drivers, buses & routes — all in one place.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

const StatCard = ({ icon, title, val }) => (
  <div className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl">
    {icon}
    <h4 className="mt-4 text-slate-400 text-sm">{title}</h4>
    <p className="text-2xl font-bold">{val}</p>
  </div>
);

export default LandingPage;