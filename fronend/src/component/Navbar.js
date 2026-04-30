import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, LogIn } from 'lucide-react';

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center">
    <Link to="/" className="flex items-center gap-3 no-underline group">
      <div className="p-2 bg-blue-600 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-blue-600/20">
        <Bus className="text-white w-6 h-6" />
      </div>
      <span className="text-2xl font-bold tracking-tighter text-white">UniTransit</span>
    </Link>
    <Link to="/login" className="px-6 py-2 bg-white text-slate-900 rounded-xl font-bold hover:bg-blue-500 hover:text-white transition-all shadow-xl flex items-center gap-2 no-underline">
      <LogIn size={18} /> Portal Login
    </Link>
  </nav>
);

export default Navbar;