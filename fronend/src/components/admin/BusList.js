import React, { useState } from "react";
import { Bus, Plus, Trash2 } from "lucide-react";
import AddBusModal from "./AddBusModal";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BusList = ({ buses, drivers, places, onDelete, onAdd }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="p-6 min-h-screen bg-[#f8fafc]">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors group"
            >
                <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Go Back
            </button>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-2">
                            <Bus className="text-blue-600" />
                            Bus Management
                        </h1>
                        <p className="text-slate-500 font-medium">Define and organize bus</p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700"
                    >
                        <Plus size={18} />
                        Add Bus
                    </button>
                </div>

                {/* List */}
                <div className="space-y-4">
                    {buses.map((bus, index) => (
                        <div
                            key={bus._id || index}
                            className="flex items-center justify-between bg-white border p-4 rounded-xl shadow-sm hover:shadow-md"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                    <Bus size={18} />
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-800">
                                        Bus {bus.busNo}
                                    </h3>
                                    <p className="text-xs text-slate-400">
                                        Plate: {bus.numberPlate}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        Shift: {bus.shift}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => onDelete(bus._id)}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <AddBusModal
                        onClose={() => setIsModalOpen(false)}
                        onAdd={onAdd}
                        drivers={drivers}
                        places={places}
                    />
                )}
            </div>
        </div>
    );
};

export default BusList;