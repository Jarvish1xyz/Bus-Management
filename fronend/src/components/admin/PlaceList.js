import React, { useState } from 'react';
import { MapPin, Plus, Trash2, Map as MapIcon } from 'lucide-react';
import AddPlaceModal from './AddPlaceModal';
import PlaceModal from './PlaceModal';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PlaceList = ({ places, onDelete, onSaveBatch }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPlaceModal, setIsPlaceModal] = useState(false);
    const [idOfPlace, setIdOfPlace] = useState("");
    const navigate = useNavigate();

    const handlePlaceModal = (placeId) => {
        setIdOfPlace(placeId);
        setIsPlaceModal(true);
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
                {/* Header Section */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                            <MapIcon className="text-blue-600" size={32} />
                            Route Management
                        </h1>
                        <p className="text-slate-500 font-medium">Define and organize bus stop sequences</p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
                    >
                        <Plus size={20} />
                        Add Places
                    </button>
                </div>

                <div className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                    {places.map((place, index) => (
                        <div
                            key={place._id || index}
                            className="flex items-center cursor-pointer justify-between bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
                            onClick={() => handlePlaceModal(place._id)}
                        >
                            {/* Left Section */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <MapPin size={20} />
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">
                                        {place.name}
                                    </h3>
                                    <p className="text-xs text-slate-400 font-medium">
                                        Place #{index + 1}
                                    </p>
                                </div>
                            </div>

                            {/* Delete Button */}
                            <button
                                onClick={() => onDelete(place._id)}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Modal Overlay */}
                {isModalOpen && (
                    <AddPlaceModal
                        onClose={() => setIsModalOpen(false)}
                        onAdd={(data) => {
                            onSaveBatch(data); // This calls handleAddPlaces in PlaceManagement.js
                            setIsModalOpen(false);
                        }}
                    />
                )}

                {isPlaceModal && (
                    <PlaceModal
                        onClose={() => setIsPlaceModal(false)}
                        placeId = {idOfPlace}
                    />
                )}
            </div>
        </div>
    );
};

export default PlaceList;