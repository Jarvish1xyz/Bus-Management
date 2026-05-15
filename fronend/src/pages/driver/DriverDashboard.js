import { useEffect, useState } from "react";
import {
    MapPin, Bus, Clock, BusFront, Navigation, Flag, CircleDot, ArrowDown
} from 'lucide-react';
import Loading from "../../components/pages/Loading";
import API from "../../api";

function DriverDashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [bus, setBus] = useState({});

    const formatShiftRoutes = () => {
        if (!bus?.routes?.length) return [];

        return bus.routes.map((route, index) => ({
            title: route.shift === "First" ? "First Shift" : "Second Shift",
            startTime: route.startTime,
            points: route.points || [],
            index
        }));
    };

    useEffect(() => {
        if (!user?.id) return;

        const fetchBus = async () => {
            try {
                const res = await API.post("/api/bus/assign-driver", {
                    driver: user?.id,
                });
                setBus(res.data);
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBus();
    }, [user?.id]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "null");
        setUser(storedUser);

        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!user || loading) return <Loading />;

    return (
        <div className="w-full px-6 space-y-6 pb-10 animate-in fade-in duration-500">

            {/* Driver Profile Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-black text-2xl">
                        {user.name?.charAt(0) || "D"}
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Hello, {user.name}</h1>
                        <p className="text-slate-500 font-medium flex items-center gap-2">
                            <Bus size={14} /> Assigned Bus: <span className="text-slate-800 font-bold">{bus.busNo}</span>
                        </p>
                    </div>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-3xl font-black text-slate-800 tracking-tight">
                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                        {currentTime.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                    </p>
                </div>
            </div>

            {/* Main Action Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left: Active Trip Status */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-200 p-6">
                        <h3 className="font-black text-slate-800 mb-5">
                            Today's Routes
                        </h3>


                        <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {formatShiftRoutes().map((route) => (
                                <div
                                    key={route.index}
                                    className="border border-slate-100 rounded-2xl p-5 bg-white shadow-sm"
                                >
                                    {/* HEADER */}
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                                <BusFront size={18} />
                                            </div>

                                            <div>
                                                <p className="font-bold text-slate-800 flex items-center gap-2">
                                                    {route.title}
                                                    <Navigation size={14} className="text-slate-400" />
                                                </p>
                                                <p className="text-xs text-slate-400">Assigned Route</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-slate-500 font-semibold">
                                            <Clock size={14} />
                                            {route.startTime}
                                        </div>
                                    </div>

                                    {/* ROUTE FLOW */}
                                    <div className="space-y-3">
                                        {route.points.map((point, i) => {
                                            const isStart = i === 0;
                                            const isEnd = i === route.points.length - 1;

                                            return (
                                                <div key={i} className="flex items-start gap-3">

                                                    {/* ICON + LINE */}
                                                    <div className="flex flex-col items-center">
                                                        <div
                                                            className={`w-8 h-8 rounded-xl flex items-center justify-center ${isStart
                                                                ? "bg-green-100 text-green-600"
                                                                : isEnd
                                                                    ? "bg-red-100 text-red-600"
                                                                    : "bg-blue-50 text-blue-600"
                                                                }`}
                                                        >
                                                            {isStart ? (
                                                                <Flag size={16} />
                                                            ) : isEnd ? (
                                                                <MapPin size={16} />
                                                            ) : (
                                                                <CircleDot size={16} />
                                                            )}
                                                        </div>

                                                        {!isEnd && (
                                                            <ArrowDown className="text-slate-300 mt-1" size={14} />
                                                        )}
                                                    </div>

                                                    {/* TEXT */}
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-slate-700">
                                                            {point.name}
                                                        </span>

                                                        {isStart && (
                                                            <span className="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded-full font-bold">
                                                                START
                                                            </span>
                                                        )}

                                                        {isEnd && (
                                                            <span className="text-[10px] bg-red-50 text-red-600 px-2 py-1 rounded-full font-bold">
                                                                FINAL
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-slate-200">
                <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                    <BusFront size={18} /> Route Summary
                </h3>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-2xl">
                        <p className="text-xs text-slate-400">Total Routes</p>
                        <p className="text-xl font-black text-slate-800">
                            {bus.routes?.length}
                        </p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl">
                        <p className="text-xs text-slate-400">Total Stops</p>
                        <p className="text-xl font-black text-slate-800">
                            {bus.routes?.reduce((acc, r) => acc + r.points.length, 0)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DriverDashboard;