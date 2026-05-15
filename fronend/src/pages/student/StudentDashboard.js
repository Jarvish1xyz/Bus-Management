import { useEffect, useState } from "react";
import {
    MapPin, Bus, Clock, QrCode, Info, Route, Flag, CircleDot, ArrowDown
} from 'lucide-react';
import Loading from "../../components/pages/Loading";
import API from "../../api";
import { BiSolidUserPin } from "react-icons/bi";

function StudentDashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [student, setStudent] = useState({});

    useEffect(() => {
        if (!user?.id) return;

        const fetchStudent = async () => {
            try {
                const res = await API.get(`/api/student/${user?.id}`, {
                    student: user?.id,
                });
                setStudent(res.data);
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [user?.id]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "null");
        setUser(storedUser);
        setLoading(false);
    }, []);

    if (!user || loading) return <Loading />;

    return (
        <div className="w-full px-6 space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Top Greeting & Notifications */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                        My Ride
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Good Morning, <span className="text-blue-600 font-bold">{user.name}</span>
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-2xl">
                        <p className="text-xs font-bold text-slate-400 uppercase">Assigned Bus</p>
                        <p className="text-lg font-black text-slate-800">
                            {student?.bus?.busNo}
                        </p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl">
                        <p className="text-xs font-bold text-slate-400 uppercase">Pickup Point</p>
                        <p className="text-lg font-black text-slate-800">
                            {student?.pickupPoint?.name}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200">
                <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                    <Bus size={18} /> Bus Info
                </h3>

                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-slate-500">Bus No</span>
                        <span className="font-bold">{student?.bus?.busNo}</span>
                        <span className="text-slate-500">Driver</span>
                        <span className="font-bold">{student?.bus?.driver?.name}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-slate-500">Bus NumberPlate</span>
                        <span className="font-bold">{student?.bus?.numberPlate}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-slate-500">Pickup</span>
                        <span className="font-bold">{student?.pickupPoint?.name}</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


                {/* Route Details */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">

                        {/* HEADER */}
                        <h3 className="font-black text-slate-800 mb-5 flex items-center gap-2">
                            <Route size={18} className="text-blue-600" />
                            Bus Route
                        </h3>

                        <div className="space-y-6">
                            {student?.bus?.routes?.map((route, idx) => (
                                <div
                                    key={idx}
                                    className="border border-slate-100 rounded-2xl p-5"
                                >
                                    {/* SHIFT HEADER */}
                                    <div className="mb-4 flex items-center justify-between">
                                        <p className="font-bold text-slate-800 flex items-center gap-2">
                                            {route.shift} Shift
                                        </p>

                                        <p className="text-xs text-slate-400 flex items-center gap-1">
                                            <Clock size={12} />
                                            {route.startTime}
                                        </p>
                                    </div>

                                    {/* ROUTE */}
                                    <div className="space-y-3">
                                        {route.points.map((point, i) => {
                                            const isMine =
                                                student?.pickupPoint?.name === point.name;
                                            const isStart = i === 0;
                                            const isEnd = i === route.points.length - 1;

                                            return (
                                                <div
                                                    key={i}
                                                    className={`flex items-start gap-3 ${isMine ? "bg-blue-50 p-2 rounded-xl" : ""
                                                        }`}
                                                >
                                                    {/* ICON */}
                                                    <div className="flex flex-col items-center">
                                                        <div
                                                            className={`w-8 h-8 rounded-xl flex items-center justify-center ${isMine
                                                                ? "bg-blue-600 text-white"
                                                                : isStart
                                                                    ? "bg-green-100 text-green-600"
                                                                    : isEnd
                                                                        ? "bg-red-100 text-red-600"
                                                                        : "bg-slate-100 text-slate-500"
                                                                }`}
                                                        >
                                                            {isMine ? (
                                                                <BiSolidUserPin size={16} />
                                                            ) : isStart ? (
                                                                <Flag size={16} />
                                                            ) : isEnd ? (
                                                                <MapPin size={16} />
                                                            ) : (
                                                                <CircleDot size={16} />
                                                            )}
                                                        </div>

                                                        {!isEnd && (
                                                            <ArrowDown size={14} className="text-slate-300 mt-1" />
                                                        )}
                                                    </div>

                                                    {/* TEXT */}
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-slate-700">
                                                            {point.name}
                                                        </span>

                                                        {isMine && (
                                                            <span className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded-full font-bold">
                                                                YOUR STOP
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

                    {/* DRIVER CARD (UPGRADED) */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
                        <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                            <BiSolidUserPin size={18} className="text-emerald-600" />
                            Driver Details
                        </h3>


                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Driver</span>
                                <span className="font-bold text-slate-800">
                                    {student?.bus?.driver?.name}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-slate-500">Phone</span>
                                <a
                                    href={`tel:${student?.bus?.driver?.phone}`}
                                >
                                    <span className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-black hover:bg-slate-800 transition-all">
                                        {"call" || "Not Available"}
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Digital ID / QR Section */}
                <div className="space-y-6">
                    <div className="bg-white border-2 border-dashed border-slate-200 p-8 rounded-[2.5rem] flex flex-col items-center text-center">
                        <div className="mb-4 p-4 bg-slate-50 rounded-3xl">
                            <QrCode size={120} className="text-slate-800" />
                        </div>
                        <h3 className="font-black text-slate-800 uppercase tracking-tight">Digital Bus Pass</h3>
                        <p className="text-xs text-slate-400 mt-1 font-medium">Scan this while boarding the bus</p>

                        <div className="mt-6 w-full py-3 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-[10px] font-black text-slate-400 uppercase">Student ID</p>
                            <p className="font-black text-slate-800">{user.id || "STU-2024-089"}</p>
                        </div>
                    </div>

                    {/* Quick Help */}
                    <div className="bg-amber-50 rounded-3xl p-5 flex gap-4 items-start">
                        <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                            <Info size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-amber-900 text-sm">Need Help?</p>
                            <p className="text-xs text-amber-700 mt-0.5">Report a lost item or raise a safety concern to the admin.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
}

export default StudentDashboard;