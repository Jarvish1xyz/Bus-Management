import { useState } from "react";
import API from "../../api";
import { useNotice } from '../../NoticeContext';
import { useNavigate } from 'react-router-dom';


export default function AdminLogin({ onLoginSuccess }) {
    const [form, setForm] = useState({ email: "", password: "" });
    const { triggerNotice } = useNotice();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/admin/login", form);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            onLoginSuccess(); // ✅ VERY IMPORTANT

            triggerNotice("Admin login successful", "success");

            navigate("/"); // ✅ FIXED (not /admin)
        } catch (err) {
            triggerNotice("Admin access denied", "error");
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4 animate-textIn">
            <input
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500 transition-all"
                placeholder="Admin Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
                type="password"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500 transition-all"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-95">
                ADMIN LOG IN
            </button>
        </form>
    );
}