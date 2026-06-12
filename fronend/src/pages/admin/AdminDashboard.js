import { useEffect, useState } from "react";
import Loading from "../../components/pages/Loading";
import { 
    Bus, MapPin, UserRound, GraduationCap, 
    ShieldCheck, 
    Clock, AlertCircle 
} from 'lucide-react';
import API from "../../api";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [count, setCount] = useState({
        places: 0,
        buses: 0,
        drivers: 0,
        students: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "null");
        setUser(storedUser);
    }, []);

    useEffect(() => {
        if (!user?.university) return;

        const fetchCounts = async () => {
            try {
                const res = await API.post("/api/count", {
                    university: user.university
                });
                setCount(res.data);
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCounts();
    }, [user?.university]);

    const countData = [
        { label: "Places", value: count.places, icon: <MapPin size={20}/>, color: "text-cyan-700", bg: "bg-cyan-700", lightBg: "bg-cyan-50" },
        { label: "Drivers", value: count.drivers, icon: <UserRound size={20}/>, color: "text-emerald-600", bg: "bg-emerald-600", lightBg: "bg-emerald-50" },
        { label: "Buses", value: count.buses, icon: <Bus size={20}/>, color: "text-amber-600", bg: "bg-amber-600", lightBg: "bg-amber-50" },
        { label: "Students", value: count.students, icon: <GraduationCap size={20}/>, color: "text-blue-600", bg: "bg-blue-600", lightBg: "bg-blue-50" },
    ];

    if (!user || loading) return <Loading />;

    return (
        <div className="w-full px-8 pb-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                        Admin Overview
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Managing <span className="text-blue-600 decoration-2 ">{count.uni}</span>'s transport hub.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {countData.map((stat, i) => (
                    <div key={i} className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-200 transition-all">
                        <div className="flex justify-between items-start">
                            <div className={`p-3 ${stat.lightBg} ${stat.color} rounded-xl`}>
                                {stat.icon}
                            </div>
                            {/* <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                <ArrowUpRight size={10} /> 12%
                            </span> */}
                        </div>
                        <div className="mt-4">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <h2 className="text-3xl font-black text-slate-800">{stat.value}</h2>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Activity Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Recent Activity Table-Style */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Clock size={18} className="text-blue-500" /> Recent Operations
                            </h3>
                            <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {[
                                { msg: "Bus B-204 departed for Route 7", time: "2 mins ago", type: "bus" },
                                { msg: "New Student: Rahul Sharma registered", time: "15 mins ago", type: "user" },
                                { msg: "Maintenance alert for Bus A-102", time: "1 hour ago", type: "alert" },
                            ].map((item, idx) => (
                                <div key={idx} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-2 rounded-full ${item.type === 'alert' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                                        <span className="text-sm text-slate-600 font-medium">{item.msg}</span>
                                    </div>
                                    <span className="text-xs text-slate-400">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Shortcuts */}
                    <div className="grid grid-cols-2 gap-4">
                        <div onClick={() => {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            navigate('/buses')
                        }} className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl text-white cursor-pointer hover:scale-[1.02] transition-transform">
                            <Bus className="mb-2 opacity-50" />
                            <p className="font-bold">Manage Fleet</p>
                            <p className="text-[10px] opacity-60">Assign drivers & routes</p>
                        </div>
                        <div className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-800 cursor-pointer hover:bg-slate-50 transition-all">
                            <ShieldCheck className="mb-2 text-emerald-500" />
                            <p className="font-bold">Safety Logs</p>
                            <p className="text-[10px] text-slate-400">View daily inspections</p>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar Column */}
                <div className="space-y-6">
                    {/* System Status Card */}
                    <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200 relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold text-lg mb-4">System Status</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span>Fleet Utilization</span>
                                        <span>80%</span>
                                    </div>
                                    <div className="w-full bg-blue-400/30 h-1.5 rounded-full">
                                        <div className="bg-white h-full w-[80%] rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                                    <AlertCircle size={18} />
                                    <div>
                                        <p className="text-xs font-bold">2 Buses Offline</p>
                                        <p className="text-[10px] opacity-70">Requires immediate service</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;