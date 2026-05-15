import { useState } from "react";
import API from "../../api";
import { useNotice } from '../../NoticeContext';
import { useNavigate } from 'react-router-dom';

export default function StudentLogin({onLoginSuccess}) {
    const [form, setForm] = useState({ email: "", password: "" });
    const { triggerNotice } = useNotice();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/student/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            onLoginSuccess();
            triggerNotice("Student login successful", "success");
            navigate("/");
        } catch (err) {
            triggerNotice("Student access denied", "error");
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4 animate-textIn">
            <input
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500 transition-all"
                placeholder="Student Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
                type="password"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500 transition-all"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button className="w-full cursor-pointer bg-blue-500 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-600 transition-all active:scale-95">
                STUDENT LOG IN
            </button>
        </form>
    );
}