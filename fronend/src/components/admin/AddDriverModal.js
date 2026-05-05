import React, { useState } from "react";
import { X, User, Save, ChevronDown } from "lucide-react";

const AddDriverModal = ({ onClose, onAdd }) => {
    const [form, setForm] = useState({
        name: "",
        salary: "",
        shift: "First",
        address: "",
        email: "",
        phone: "",
    });

    const [openDropdown, setOpenDropdown] = useState(null);

    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    const handleSubmit = () => {
        onAdd(form);
    };

    // Custom Dropdown
    const Dropdown = ({ label, value, options, onSelect, id }) => (
        <div className="relative">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                {label}
            </label>

            <button
                onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
                className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-semibold text-slate-700"
            >
                {value}
                <ChevronDown size={18} />
            </button>

            {openDropdown === id && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-lg">
                    {options.map((opt, i) => (
                        <div
                            key={i}
                            onClick={() => {
                                onSelect(opt.value);
                                setOpenDropdown(null);
                            }}
                            className="px-5 py-3 hover:bg-blue-50 cursor-pointer text-sm font-semibold"
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-3xl h-[85vh] flex flex-col rounded-[2.5rem] shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                        <User className="text-blue-600" />
                        Add Driver
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 grid grid-cols-2 gap-6 overflow-y-auto flex-1">

                    {/* Name */}
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                            Name
                        </label>
                        <input
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl"
                            value={form.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                        />
                    </div>

                    {/* Salary */}
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                            Salary
                        </label>
                        <input
                            type="number"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl"
                            value={form.salary}
                            onChange={(e) => handleChange("salary", e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                            Email
                        </label>
                        <input
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl "
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                            Phone
                        </label>
                        <input
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl"
                            value={form.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                        />
                    </div>

                    {/* Shift */}
                    <Dropdown
                        id="shift"
                        label="Shift"
                        value={form.shift}
                        options={[
                            { label: "First", value: "First" },
                            { label: "Second", value: "Second" },
                            { label: "Both", value: "Both" },
                        ]}
                        onSelect={(val) => handleChange("shift", val)}
                    />

                    {/* Address */}
                    <div className="col-span-2">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                            Address
                        </label>
                        <textarea
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl"
                            value={form.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                    <button onClick={onClose} className="flex-1 py-4 font-bold text-slate-500">
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                    >
                        <Save size={20} />
                        Save Driver
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddDriverModal;