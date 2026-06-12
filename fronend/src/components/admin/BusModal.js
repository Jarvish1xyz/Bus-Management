import React, { useEffect, useState, useCallback  } from "react";
import {
    X,
    Pencil,
    Bus,
    User,
    Clock3,
    CalendarDays,
    MapPin,
    Save,
    CarFront,
    ShieldCheck,
    Route,
    ChevronDown,
} from "lucide-react";
import API from "../../api";
import { useNotice } from "../../NoticeContext";

const BusModal = ({
    busId,
    onClose,
    onUpdated,
    drivers = [],
    places = [],
}) => {

    const [bus, setBus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    const { triggerNotice, triggerConfirm } = useNotice();

    const [form, setForm] = useState({
        busNo: "",
        numberPlate: "",
        driver: "",
        lastServiced: "",
        routes: [],
    });
    
    const fetchBus = useCallback (async () => {
        try {
            setLoading(true);

            const res = await API.post(`/api/bus/${busId}`);

            setBus(res.data);

            setForm({
                busNo: res.data.busNo || "",
                numberPlate: res.data.numberPlate || "",
                driver: res.data.driver?._id || "",
                lastServiced: res.data.lastServiced
                    ? res.data.lastServiced.split("T")[0]
                    : "",
                routes:
                    res.data.routes?.map((route) => ({
                        shift: route.shift,
                        startTime: route.startTime,
                        points: route.points?.map((p) => p._id),
                    })) || [],
            });

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, [busId]);

    useEffect(() => {
        if (busId) {
            fetchBus();
        }
    }, [busId, fetchBus]);


    const handleChange = (key, value) => {
        setForm({
            ...form,
            [key]: value,
        });
    };

    const handleRouteChange = (index, field, value) => {
        const updated = [...form.routes];

        updated[index][field] = value;

        setForm({
            ...form,
            routes: updated,
        });
    };

    const togglePlace = (routeIndex, placeId) => {

        const updated = [...form.routes];

        const current = updated[routeIndex].points;

        if (current.includes(placeId)) {
            updated[routeIndex].points = current.filter(
                (p) => p !== placeId
            );
        } else {
            updated[routeIndex].points.push(placeId);
        }

        setForm({
            ...form,
            routes: updated,
        });
    };

    const handleUpdateBus = async () => {

        triggerConfirm(
            "Are you sure you want to update this bus details?",
            async () => {
                try {

                    await API.patch(`/api/bus/${busId}`, form);

                    triggerNotice("Bus updated successfully", "success");

                    setIsEdit(false);

                    fetchBus();

                    if (onUpdated) {
                        onUpdated();
                    }

                } catch (err) {
                    console.log(err);
                    triggerNotice("Failed to update bus", "error");
                }
            },
            "primary"
        );
    };

    const Dropdown = ({ label, value, options, onSelect, id }) => (
        <div className="relative">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                {label}
            </label>

            <button
                onClick={() =>
                    setOpenDropdown(openDropdown === id ? null : id)
                }
                className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-semibold text-slate-700"
            >
                {value || label}
                <ChevronDown size={18} />
            </button>

            {openDropdown === id && (
                <div className="absolute z-20 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-lg overflow-hidden">
                    {options.map((opt, i) => (
                        <div
                            key={i}
                            onClick={() => {
                                onSelect(opt);
                                setOpenDropdown(null);
                            }}
                            className="px-5 py-3 hover:bg-blue-50 cursor-pointer text-sm font-semibold text-slate-700"
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                <div className="bg-white rounded-3xl px-10 py-8 shadow-2xl">
                    <p className="font-bold text-slate-600">
                        Loading bus details...
                    </p>
                </div>
            </div>
        );
    }

    if (!bus) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">

            <div className="bg-white w-full max-w-6xl h-[92vh] overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/20 animate-in zoom-in duration-300 flex flex-col">

                {/* HEADER */}
                <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 pt-8 px-8 pb-16 text-white rounded-t-[2.5rem]">

                    <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 flex items-start justify-between gap-4">

                        <div className="flex items-start gap-5">

                            <div className="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                                <Bus size={36} />
                            </div>

                            <div>

                                <p className="text-xs uppercase tracking-[0.3em] font-bold text-blue-100">
                                    Bus Profile
                                </p>

                                {isEdit ? (
                                    <input
                                        value={form.busNo}
                                        onChange={(e) =>
                                            handleChange("busNo", e.target.value)
                                        }
                                        className="mt-2 bg-white/20 border border-white/20 rounded-2xl px-4 py-3 text-3xl font-black outline-none w-full"
                                    />
                                ) : (
                                    <h2 className="text-4xl font-black mt-1">
                                        Bus {bus.busNo}
                                    </h2>
                                )}

                                <div className="flex flex-wrap gap-3 mt-6 relative z-20">

                                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2">
                                        <CarFront size={16} />
                                        <span className="font-bold text-sm">
                                            {bus.numberPlate}
                                        </span>
                                    </div>

                                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2">
                                        <Route size={16} />
                                        <span className="font-bold text-sm">
                                            {bus.routes?.length} Routes
                                        </span>
                                    </div>

                                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2">
                                        <ShieldCheck size={16} />
                                        <span className="font-bold text-sm">
                                            Active Bus
                                        </span>
                                    </div>

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
                                        onClick={handleUpdateBus}
                                        className="px-4 py-3 rounded-2xl bg-emerald-500 text-white font-bold flex items-center gap-2 hover:scale-105 transition-all"
                                    >
                                        <Save size={18} />
                                        Save
                                    </button>

                                    <button
                                        onClick={() => setIsEdit(false)}
                                        className="px-4 py-3 rounded-2xl bg-red-500 text-white font-bold hover:scale-105 transition-all"
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
                <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-slate-50">

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* LEFT */}
                        <div className="lg:col-span-1 space-y-6">

                            {/* BUS INFO */}
                            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">

                                <div className="flex items-center gap-3 mb-6">

                                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                        <Bus size={22} />
                                    </div>

                                    <div>
                                        <h3 className="font-black text-slate-800 text-xl">
                                            Bus Information
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            Complete bus details
                                        </p>
                                    </div>

                                </div>

                                <div className="space-y-4">

                                    {/* NUMBER PLATE */}
                                    <div className="bg-slate-50 rounded-2xl p-4">

                                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                                            <CarFront size={16} />
                                            <span className="text-xs font-bold uppercase">
                                                Number Plate
                                            </span>
                                        </div>

                                        {isEdit ? (
                                            <input
                                                value={form.numberPlate}
                                                onChange={(e) =>
                                                    handleChange(
                                                        "numberPlate",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold outline-none"
                                            />
                                        ) : (
                                            <p className="font-bold text-slate-800">
                                                {bus.numberPlate}
                                            </p>
                                        )}

                                    </div>

                                    {/* DRIVER */}
                                    <div className="bg-slate-50 rounded-2xl p-4">

                                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                                            <User size={16} />
                                            <span className="text-xs font-bold uppercase">
                                                Driver
                                            </span>
                                        </div>

                                        {isEdit ? (
                                            <Dropdown
                                                id="driver"
                                                label="Select Driver"
                                                value={
                                                    drivers.find(
                                                        (d) => d._id === form.driver
                                                    )?.name
                                                }
                                                options={drivers.map((d) => ({
                                                    label: d.name,
                                                    value: d._id,
                                                }))}
                                                onSelect={(opt) =>
                                                    handleChange("driver", opt.value)
                                                }
                                            />
                                        ) : (
                                            <p className="font-bold text-slate-800">
                                                {bus.driver?.name}
                                            </p>
                                        )}

                                    </div>

                                    {/* LAST SERVICED */}
                                    <div className="bg-slate-50 rounded-2xl p-4">

                                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                                            <CalendarDays size={16} />
                                            <span className="text-xs font-bold uppercase">
                                                Last Serviced
                                            </span>
                                        </div>

                                        {isEdit ? (
                                            <input
                                                type="date"
                                                value={form.lastServiced}
                                                onChange={(e) =>
                                                    handleChange(
                                                        "lastServiced",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold outline-none"
                                            />
                                        ) : (
                                            <p className="font-bold text-slate-800">
                                                {new Date(
                                                    bus.lastServiced
                                                ).toLocaleDateString()}
                                            </p>
                                        )}

                                    </div>

                                </div>

                            </div>

                            {/* STATUS CARD */}
                            <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-3xl p-6 text-white shadow-xl">

                                <div className="flex items-center justify-between mb-5">

                                    <div>
                                        <p className="text-blue-100 text-sm font-bold uppercase tracking-wider">
                                            Bus Status
                                        </p>

                                        <h3 className="text-2xl font-black mt-1">
                                            Running
                                        </h3>
                                    </div>

                                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                                        <Bus size={28} />
                                    </div>

                                </div>

                                <div className="space-y-3">

                                    <div className="bg-white/10 rounded-2xl p-4 flex items-center justify-between">

                                        <span className="font-semibold text-sm">
                                            Assigned Driver
                                        </span>

                                        <span className="font-black">
                                            {bus.driver?.name || "N/A"}
                                        </span>

                                    </div>

                                    <div className="bg-white/10 rounded-2xl p-4 flex items-center justify-between">

                                        <span className="font-semibold text-sm">
                                            Total Routes
                                        </span>

                                        <span className="font-black">
                                            {bus.routes?.length}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* RIGHT */}
                        <div className="lg:col-span-2">

                            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">

                                <div className="flex items-center gap-3 mb-6">

                                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                        <MapPin size={22} />
                                    </div>

                                    <div>
                                        <h3 className="font-black text-slate-800 text-xl">
                                            Bus Routes
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            Pickup points and timings
                                        </p>
                                    </div>

                                </div>

                                <div className="space-y-5">

                                    {form.routes.map((route, routeIndex) => (

                                        <div
                                            key={routeIndex}
                                            className="border border-slate-200 rounded-3xl p-5 bg-slate-50"
                                        >

                                            {/* TOP */}
                                            <div className="flex items-center justify-between mb-5">

                                                <div className="flex items-center gap-3">

                                                    <div
                                                        className={`px-4 py-2 rounded-xl font-bold text-sm ${
                                                            route.shift === "First"
                                                                ? "bg-blue-100 text-blue-700"
                                                                : "bg-violet-100 text-violet-700"
                                                        }`}
                                                    >
                                                        {route.shift} Shift
                                                    </div>

                                                </div>

                                                <div className="flex items-center gap-2 text-slate-600 font-bold">

                                                    <Clock3 size={16} />

                                                    {isEdit ? (
                                                        <input
                                                            type="time"
                                                            value={route.startTime}
                                                            onChange={(e) =>
                                                                handleRouteChange(
                                                                    routeIndex,
                                                                    "startTime",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="bg-white px-3 py-2 rounded-xl border border-slate-200"
                                                        />
                                                    ) : (
                                                        <span>
                                                            {route.startTime}
                                                        </span>
                                                    )}

                                                </div>

                                            </div>

                                            {/* POINTS */}
                                            <div className="flex flex-wrap gap-2">

                                                {places.map((place) => {

                                                    const active =
                                                        route.points.includes(place._id);

                                                    return (
                                                        <button
                                                            key={place._id}
                                                            disabled={!isEdit}
                                                            onClick={() =>
                                                                togglePlace(
                                                                    routeIndex,
                                                                    place._id
                                                                )
                                                            }
                                                            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                                                                active
                                                                    ? "bg-blue-600 text-white"
                                                                    : "bg-white text-slate-600 border border-slate-200"
                                                            }`}
                                                        >
                                                            <MapPin
                                                                size={14}
                                                                className="inline mr-1"
                                                            />
                                                            {place.name}
                                                        </button>
                                                    );
                                                })}

                                            </div>

                                        </div>
                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default BusModal;