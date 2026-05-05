import { useState } from "react";
import API from "../api/axiosConfig";
import { setAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import RoleSlider from "../component/RoleSlider";
import GlassCard from "../component/GlassCard";

export default function LoginPage() {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post(`/auth/${role}`, {
        email,
        password,
      });

      setAuth(res.data);

      if (role === "admin") navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-purple-100">
      <GlassCard>
        <h2 className="text-xl mb-4">Login</h2>

        <RoleSlider role={role} setRole={setRole} />

        <input placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)} />

        <button onClick={handleLogin}
          className="mt-4 w-full bg-purple-500 text-white py-2 rounded">
          Login
        </button>
      </GlassCard>
    </div>
  );
}