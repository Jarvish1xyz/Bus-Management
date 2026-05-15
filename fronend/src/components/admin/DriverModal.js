import React, { useEffect, useState, useCallback } from "react";
import {
    X,
    User,
    Pencil,
    Save,
    Mail,
    Phone,
    MapPin,
    IndianRupee,
    Clock3,
    Bus,
    Route,
    ShieldCheck,
    CalendarDays,
    ChevronDown,
    CarFront
} from "lucide-react";
import API from "../../api";
import { useNotice } from '../../NoticeContext';

const DriverModal = ({ driverId, onClose }) => {
    const [loading, setLoading] = useState(true);
    const [driver, setDriver] = useState(null);
    const [buses, setBuses] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const { triggerNotice, triggerConfirm } = useNotice();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        salary: "",
        shift: "First"
    });

    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    const fetchDriver = useCallback(async () => {
        try {
            setLoading(true);

            const user = JSON.parse(localStorage.getItem("user"));

            const res = await API.post(
                `/api/driver/${driverId}`,
                {
                    university: user.university
                }
            );

            setDriver(res.data.driver);
            setForm({
                name: res.data.driver.name || "",
                email: res.data.driver.email || "",
                phone: res.data.driver.phone || "",
                address: res.data.driver.address || "",
                salary: res.data.driver.salary || "",
                shift: res.data.driver.shift || "First"
            });
            setBuses(res.data.buses || []);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, [driverId]);

    useEffect(() => {
        if (driverId) {
            fetchDriver();
        }
    }, [driverId, fetchDriver]);

    const handleUpdateDriver = async (e) => {
        if (e) e.preventDefault();
        triggerConfirm("Are you sure you want to update this driver's details?",
            async () => {
                try {

                    await API.patch(
                        `/api/driver/${driverId}`,
                        form
                    );

                    setDriver({
                        ...driver,
                        ...form
                    });
                    triggerNotice("Driver details updated", "success");

                    setIsEdit(false);

                } catch (err) {
                    console.log(err);
                }
            }, "primary");
    };

    const Dropdown = ({ label, value, options, onSelect, id }) => (
        <div className="relative">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                {label}
            </label>

            <button
                onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
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
                        Loading driver details...
                    </p>
                </div>
            </div>
        );
    }

    if (!driver) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">

            <div className="bg-white w-full max-w-5xl h-[92vh] overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/20 animate-in zoom-in duration-300 flex flex-col">

                {/* HEADER */}
                <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 pt-8 px-8 pb-16 text-white rounded-t-[2.5rem]">

                    <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 flex items-start justify-between gap-4">

                        <div className="flex items-start gap-5">

                            <div className="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                                <User size={36} />
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] font-bold text-blue-100">
                                    Driver Profile
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
                                        {driver.name}
                                    </h2>
                                )}

                                <div className="flex flex-wrap gap-3 mt-6 relative z-20">

                                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2">
                                        <Clock3 size={16} />
                                        <span className="font-bold text-sm">
                                            {driver.shift} Shift
                                        </span>
                                    </div>

                                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2">
                                        <Bus size={16} />
                                        <span className="font-bold text-sm">
                                            {buses.length} Assigned Buses
                                        </span>
                                    </div>

                                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2">
                                        <ShieldCheck size={16} />
                                        <span className="font-bold text-sm">
                                            Active Driver
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
                                        onClick={handleUpdateDriver}
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
                <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-slate-50">

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* LEFT */}
                        <div className="lg:col-span-1 space-y-6">

                            {/* INFO CARD */}
                            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">

                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                        <User size={22} />
                                    </div>

                                    <div>
                                        <h3 className="font-black text-slate-800 text-xl">
                                            Personal Info
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            Driver information
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">

                                    <div className="bg-slate-50 rounded-2xl p-4">
                                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                                            <Mail size={16} />
                                            <span className="text-xs font-bold uppercase">
                                                Email
                                            </span>
                                        </div>

                                        {isEdit ? (
                                            <input
                                                value={form.email}
                                                onChange={(e) =>
                                                    setForm({ ...form, email: e.target.value })
                                                }
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold outline-none"
                                            />
                                        ) : (
                                            <p className="font-bold text-slate-800 break-all">
                                                {driver.email}
                                            </p>
                                        )}
                                    </div>

                                    <div className="bg-slate-50 rounded-2xl p-4">
                                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                                            <Phone size={16} />
                                            <span className="text-xs font-bold uppercase">
                                                Phone
                                            </span>
                                        </div>

                                        {isEdit ? (
                                            <input
                                                value={form.phone}
                                                onChange={(e) =>
                                                    setForm({ ...form, phone: e.target.value })
                                                }
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold outline-none"
                                            />
                                        ) : (
                                            <p className="font-bold text-slate-800">
                                                {driver.phone || "Not Available"}
                                            </p>
                                        )}
                                    </div>

                                    <div className="bg-slate-50 rounded-2xl p-4">
                                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                                            <MapPin size={16} />
                                            <span className="text-xs font-bold uppercase">
                                                Address
                                            </span>
                                        </div>

                                        {isEdit ? (
                                            <textarea
                                                value={form.address}
                                                onChange={(e) =>
                                                    setForm({ ...form, address: e.target.value })
                                                }
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold outline-none"
                                            />
                                        ) : (
                                            <p className="font-bold text-slate-800">
                                                {driver.address || "No Address"}
                                            </p>
                                        )}
                                    </div>

                                    <div className="bg-slate-50 rounded-2xl p-4">
                                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                                            <IndianRupee size={16} />
                                            <span className="text-xs font-bold uppercase">
                                                Salary
                                            </span>
                                        </div>

                                        {isEdit ? (
                                            <input
                                                type="number"
                                                value={form.salary}
                                                onChange={(e) =>
                                                    setForm({ ...form, salary: e.target.value })
                                                }
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-black outline-none"
                                            />
                                        ) : (
                                            <p className="font-black text-emerald-600 text-lg">
                                                ₹ {driver.salary}
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
                                            Driver Status
                                        </p>

                                        <h3 className="text-2xl font-black mt-1">
                                            On Duty
                                        </h3>
                                    </div>

                                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                                        <CarFront size={28} />
                                    </div>
                                </div>

                                <div className="space-y-3">

                                    <div className="bg-white/10 rounded-2xl p-4 flex items-center justify-between">
                                        <span className="font-semibold text-sm">
                                            Shift
                                        </span>

                                        {isEdit ? (
                                            <Dropdown
                                                id="shift"
                                                label="Shift"
                                                value={form.shift}
                                                options={[
                                                    { label: "First", value: "First" },
                                                    { label: "Second", value: "Second" },
                                                    { label: "Both", value: "Both" },
                                                ]}
                                                onSelect={(opt) => handleChange("shift", opt.value)}
                                            />
                                        ) : (
                                            <span className="font-black">
                                                {driver.shift}
                                            </span>
                                        )}
                                    </div>

                                    <div className="bg-white/10 rounded-2xl p-4 flex items-center justify-between">
                                        <span className="font-semibold text-sm">
                                            Total Routes
                                        </span>

                                        <span className="font-black">
                                            {buses.length}
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
                                        <Bus size={22} />
                                    </div>

                                    <div>
                                        <h3 className="font-black text-slate-800 text-xl">
                                            Assigned Buses
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            Buses managed by this driver
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-5">

                                    {buses.length > 0 ? (
                                        buses.map((bus, index) => (
                                            <div
                                                key={index}
                                                className="border border-slate-200 rounded-3xl p-5 bg-slate-50"
                                            >

                                                {/* TOP */}
                                                <div className="flex items-center justify-between mb-5">

                                                    <div>
                                                        <p className="text-xs uppercase font-bold text-slate-400">
                                                            Bus Number
                                                        </p>

                                                        <h2 className="text-3xl font-black text-slate-800">
                                                            {bus.busNo}
                                                        </h2>
                                                    </div>

                                                    <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                                        <Route size={26} />
                                                    </div>
                                                </div>

                                                {/* INFO */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

                                                    <div className="bg-white rounded-2xl p-4 border border-slate-100">
                                                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                                                            <CarFront size={16} />
                                                            <span className="text-xs uppercase font-bold">
                                                                Number Plate
                                                            </span>
                                                        </div>

                                                        <p className="font-black text-slate-800">
                                                            {bus.numberPlate}
                                                        </p>
                                                    </div>

                                                    <div className="bg-white rounded-2xl p-4 border border-slate-100">
                                                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                                                            <CalendarDays size={16} />
                                                            <span className="text-xs uppercase font-bold">
                                                                Last Serviced
                                                            </span>
                                                        </div>

                                                        <p className="font-black text-slate-800">
                                                            {new Date(bus.lastServiced).toLocaleDateString()}
                                                        </p>
                                                    </div>

                                                </div>

                                                {/* ROUTES */}
                                                <div className="space-y-4">

                                                    {bus.routes?.map((route, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="bg-white border border-slate-100 rounded-2xl p-4"
                                                        >

                                                            <div className="flex items-center justify-between mb-3">
                                                                <div className="flex items-center gap-2">
                                                                    <Clock3
                                                                        size={16}
                                                                        className="text-blue-600"
                                                                    />

                                                                    <p className="font-bold text-slate-800">
                                                                        {route.shift} Shift
                                                                    </p>
                                                                </div>

                                                                <span className="text-sm font-bold text-slate-500">
                                                                    {route.startTime}
                                                                </span>
                                                            </div>

                                                            <div className="flex flex-wrap gap-2">
                                                                {route.points?.map((point, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className="px-3 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold flex items-center gap-2"
                                                                    >
                                                                        <MapPin size={14} />
                                                                        {point.name}
                                                                    </div>
                                                                ))}
                                                            </div>

                                                        </div>
                                                    ))}

                                                </div>

                                            </div>
                                        ))
                                    ) : (
                                        <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center bg-slate-50">

                                            <Bus
                                                size={48}
                                                className="mx-auto text-slate-300 mb-4"
                                            />

                                            <h3 className="text-xl font-black text-slate-600 mb-2">
                                                No Buses Assigned
                                            </h3>

                                            <p className="text-slate-400 font-medium">
                                                This driver currently has no assigned buses.
                                            </p>

                                        </div>
                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default DriverModal;