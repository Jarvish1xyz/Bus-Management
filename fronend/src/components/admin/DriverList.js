import React, { useState } from "react";
import { User, Plus, Trash2, ChevronLeft } from "lucide-react";
import AddDriverModal from "./AddDriverModal";
import { useNavigate } from "react-router-dom";

const DriverList = ({ drivers, onDelete, onAdd }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="p-3 min-h-screen bg-[#f8fafc]">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors group"
            >
                <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Go Back
            </button>
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-2">
                            <User className="text-blue-600" />
                            Driver Management
                        </h1>
                        <p className="text-slate-500 font-medium">Define and organize driver</p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
                    >
                        <Plus size={20} />
                        Add Driver
                    </button>
                </div>

                {/* List */}
                <div className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                    {drivers.map((driver, index) => (
                        <div
                            key={driver._id || index}
                            className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                    <User size={18} />
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-800">{driver.name}</h3>
                                    <p className="text-xs text-slate-400">
                                        {driver.email} • {driver.phone}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => onDelete(driver._id)}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <AddDriverModal
                        onClose={() => setIsModalOpen(false)}
                        onAdd={(data) => {
                            onAdd(data);
                            setIsModalOpen(false);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default DriverList;