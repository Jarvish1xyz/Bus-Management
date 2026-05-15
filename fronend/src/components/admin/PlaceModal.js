import React, { useEffect, useState, useCallback  } from 'react';
import {
    X,
    MapPin,
    Pencil,Save,
    Bus,
    Users,
    Route,
    Clock,
    ArrowRight,
    School,
    User
} from 'lucide-react';
import API from '../../api';
import { useNotice } from '../../NoticeContext';

const PlaceModal = ({ onClose, placeId }) => {
    const [loading, setLoading] = useState(true);
    const [place, setPlace] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const { triggerNotice, triggerConfirm } = useNotice();

    const [form, setForm] = useState({
        name: ""
    });
    
    const fetchPlace = useCallback (async () => {
        try {
            setLoading(true);

            const user = JSON.parse(localStorage.getItem("user"));

            const res = await API.post(
                `/api/place/${placeId}`,
                {
                    university: user.university
                }
            );

            setPlace(res.data);
            setForm({
                name: res.data.name || "",
            })

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, [placeId]);

    useEffect(() => {
        if (placeId) {
            fetchPlace();
        }
    }, [placeId, fetchPlace]);


    const handleUpdatePlace = async (e) => {
        if (e) e.preventDefault();
        triggerConfirm("Are you sure you want to update Name of the place?",
            async () => {
                try {

                    await API.patch(
                        `/api/place/${placeId}`,
                        form
                    );

                    setPlace({
                        ...form
                    });
                    triggerNotice("Place Name updated", "success");

                    setIsEdit(false);

                } catch (err) {
                    console.log(err);
                }
            }, "primary");
    };

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="bg-white rounded-3xl px-10 py-8 shadow-2xl">
                    <p className="font-bold text-slate-600">Loading place details...</p>
                </div>
            </div>
        );
    }

    if (!place) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/50 backdrop-blur-md">
            <div className="bg-white w-full max-w-5xl h-[85vh] rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in duration-300 flex flex-col">

                {/* HEADER */}
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">

                    <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                                    <MapPin size={28} />
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-[0.25em] font-bold text-blue-100">
                                        Pickup Point
                                    </p>

                                    {isEdit ? (
                                        <input
                                            value={form.name}
                                            onChange={(e) =>
                                                setForm({ ...form, name: e.target.value })
                                            }
                                            className="mt-2 bg-white/20 border border-white/20 rounded-2xl px-4 py-3 text-3xl font-black outline-none w-full"
                                        />
                                    ) : (
                                        <h2 className="text-4xl font-black mt-1">
                                            {place.name}
                                        </h2>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 mt-5">
                                <div className="bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-md flex items-center gap-2">
                                    <Bus size={16} />
                                    <span className="font-bold text-sm">
                                        {place.totalBuses || 0} Buses
                                    </span>
                                </div>

                                <div className="bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-md flex items-center gap-2">
                                    <Users size={16} />
                                    <span className="font-bold text-sm">
                                        {place.totalStudents || 0} Students
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">

                            {!isEdit ? (
                                <button
                                    onClick={() => setIsEdit(true)}
                                    className="px-5 py-3 rounded-2xl bg-white text-slate-800 font-bold flex items-center gap-2 hover:scale-105 transition-all"
                                >
                                    <Pencil size={18} />
                                    Edit
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={handleUpdatePlace}
                                        className="px-3 py-2 rounded-lg bg-emerald-500 text-white font-bold flex items-center gap-2 hover:scale-105 transition-all"
                                    >
                                        <Save size={18} />
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setIsEdit(false)}
                                        className="px-3 py-2 rounded-lg bg-red-500 text-white font-bold flex items-center gap-2 hover:scale-105 transition-all"
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}

                            <button
                                onClick={onClose}
                                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all"
                            >
                                <X size={24} />
                            </button>

                        </div>
                    </div>
                </div>

                {/* BODY */}
                <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 xl:grid-cols-2 gap-6 scrollbar-thin scrollbar-thumb-slate-300">

                    {/* BUSES */}
                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                <Bus size={22} />
                            </div>

                            <div>
                                <h3 className="font-black text-slate-800 text-xl">
                                    Assigned Buses
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Buses visiting this stop
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {place.buses?.length > 0 ? (
                                place.buses.map((bus, index) => (
                                    <div
                                        key={index}
                                        className="bg-white border border-slate-200 rounded-2xl p-5"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <p className="text-xs font-bold uppercase text-slate-400">
                                                    Bus Number
                                                </p>

                                                <h4 className="text-2xl font-black text-slate-800">
                                                    {bus.busNo}
                                                </h4>
                                            </div>

                                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                                <Route size={22} />
                                            </div>
                                        </div>

                                        <div className="space-y-3">

                                            <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3">
                                                <div className="flex items-center gap-2">
                                                    <User size={16} className="text-slate-500" />
                                                    <span className="text-sm font-medium text-slate-600">
                                                        Driver
                                                    </span>
                                                </div>

                                                <span className="font-bold text-slate-800">
                                                    {bus.driver?.name || "Not Assigned"}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3">
                                                <div className="flex items-center gap-2">
                                                    <Clock size={16} className="text-slate-500" />
                                                    <span className="text-sm font-medium text-slate-600">
                                                        Shift
                                                    </span>
                                                </div>

                                                <span className="font-bold text-slate-800">
                                                    {bus.routes?.map(r => r.shift).join(", ")}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3">
                                                <div className="flex items-center gap-2">
                                                    <ArrowRight size={16} className="text-slate-500" />
                                                    <span className="text-sm font-medium text-slate-600">
                                                        Number Plate
                                                    </span>
                                                </div>

                                                <span className="font-bold text-slate-800">
                                                    {bus.numberPlate}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-8 text-center">
                                    <Bus className="mx-auto text-slate-300 mb-3" size={40} />
                                    <p className="font-bold text-slate-500">
                                        No buses assigned
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* STUDENTS */}
                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                <School size={22} />
                            </div>

                            <div>
                                <h3 className="font-black text-slate-800 text-xl">
                                    Students
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Students using this stop
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {place.students?.length > 0 ? (
                                place.students.map((student, index) => (
                                    <div
                                        key={index}
                                        className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
                                                {student.name?.charAt(0)}
                                            </div>

                                            <div>
                                                <p className="font-bold text-slate-800">
                                                    {student.name}
                                                </p>

                                                <p className="text-xs text-slate-400">
                                                    {student.email}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xs text-slate-400 font-bold uppercase">
                                                Bus
                                            </p>

                                            <p className="font-black text-blue-600">
                                                {student.bus?.busNo || "--"}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-8 text-center">
                                    <Users className="mx-auto text-slate-300 mb-3" size={40} />
                                    <p className="font-bold text-slate-500">
                                        No students assigned
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceModal;