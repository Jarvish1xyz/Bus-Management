import React, { useState } from "react";
import { X, Save, User, Mail, MapPin } from "lucide-react";

const AddStudentModal = ({ onClose, onAdd, places = [] }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    pickupPoint: "",
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.pickupPoint) return;

    onAdd(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in duration-300">

        {/* HEADER */}
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <User className="text-blue-600" />
            Add Student
          </h2>

          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-8 space-y-5">

          {/* NAME */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-semibold"
                placeholder="Student name"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-semibold"
                placeholder="example@gmail.com"
              />
            </div>
          </div>

          {/* PICKUP POINT */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
              Pickup Point
            </label>

            <div className="flex flex-wrap gap-2">
              {places.map((p) => (
                <button
                  key={p._id}
                  onClick={() => handleChange("pickupPoint", p.name)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
                    form.pickupPoint === p.name
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-slate-50 text-slate-600 border-slate-200"
                  }`}
                >
                  <MapPin size={14} className="inline mr-1" />
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-4 font-bold text-slate-500 hover:text-slate-800"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Save Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;