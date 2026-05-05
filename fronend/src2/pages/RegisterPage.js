import { useState } from "react";
import API from "../api/axiosConfig";
import GlassCard from "../component/GlassCard";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    uniName: "",
    uniEmail: "",
    adminName: "",
    adminEmail: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async () => {
    try {
      // 1. Create University
      const uniRes = await API.post("/api/university", {
        name: form.uniName,
        email: form.uniEmail,
      });

      const universityId = uniRes.data._id;

      // 2. Create Admin
      await API.post("/api/admin", {
        name: form.adminName,
        email: form.adminEmail,
        password: form.password,
        confirmPassword: form.confirmPassword,
        university: universityId,
      });

      alert("Registered Successfully");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-100">
      <GlassCard>
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <div className="grid grid-cols-2 gap-4">
          {/* University */}
          <input placeholder="University Name"
            onChange={(e)=>setForm({...form, uniName:e.target.value})}/>
          <input placeholder="University Email"
            onChange={(e)=>setForm({...form, uniEmail:e.target.value})}/>

          {/* Admin */}
          <input placeholder="Admin Name"
            onChange={(e)=>setForm({...form, adminName:e.target.value})}/>
          <input placeholder="Admin Email"
            onChange={(e)=>setForm({...form, adminEmail:e.target.value})}/>
          <input type="password" placeholder="Password"
            onChange={(e)=>setForm({...form, password:e.target.value})}/>
          <input type="password" placeholder="Confirm Password"
            onChange={(e)=>setForm({...form, confirmPassword:e.target.value})}/>
        </div>

        <button onClick={handleSubmit}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded">
          Register
        </button>
      </GlassCard>
    </div>
  );
}