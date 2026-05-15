import React, { useState } from "react";
import { Bus, Plus, Trash2, ChevronLeft } from "lucide-react";
import AddBusModal from "./AddBusModal";
import { useNavigate } from "react-router-dom";
import BusModal from "./BusModal";

const BusList = ({ buses, drivers, places, onDelete, onAdd }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBusModal, setIsBusModal] = useState(false);
    const [idOfBus, setIdOfBus] = useState("");
    const navigate = useNavigate();

    const handleBusModal = (busId) => {
        setIdOfBus(busId);
        setIsBusModal(true);
    }

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
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
                    >
                        <Plus size={20} />
                        Add Buses
                    </button>
                </div>

                {/* List 3.33 2.10*/}
                <div className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                    {buses.map((bus, index) => (
                        <div
                            key={bus._id || index}
                            className="flex items-center cursor-pointer justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition"
                            onClick={() => handleBusModal(bus._id)}
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
                                    <div className="flex gap-2 mt-1">
                                        {bus.routes?.map((r, i) => (
                                            <span
                                                key={i}
                                                className={`text-[10px] px-2 py-1 rounded-full font-bold ${r.shift === "First"
                                                    ? "bg-blue-50 text-blue-600"
                                                    : "bg-purple-50 text-purple-600"
                                                    }`}
                                            >
                                                {r.shift}
                                            </span>
                                        ))}
                                    </div>
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

                {isBusModal && (
                    <BusModal
                        busId={idOfBus}
                        drivers={drivers}
                        places={places}
                        onClose={() => setIsBusModal(false)}
                        onUpdated={() => {
                            setIsBusModal(false);
                            window.location.reload();
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default BusList;