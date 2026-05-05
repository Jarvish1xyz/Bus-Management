import { useNavigate, useLocation } from "react-router-dom";
import { Bus, MapPin, UserRound, GraduationCap, House } from 'lucide-react';


function Sidebar({ isCollapsed, onLogout }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onLogout();
    navigate("/");
  };

  const icons = [
    {
      link: "/",
      icon: (
        <House size={20} />
      ),
      name: "Dashboard",
    },
    {
      link: "/places",
      icon: (
        <MapPin size={20} />
      ),
      name: "Places",
    },
    {
      link: "/drivers",
      icon: (
        <UserRound size={20} />
      ),
      name: "Drivers",
    },
    {
      link: "/buses",
      icon: (
        <Bus size={20} />
      ),
      name: "Buses",
    },
    {
      link: "/students",
      icon: (
        <GraduationCap size={20} />
      ),
      name: "Students",
    },
  ]

  return (
    <div className="h-full flex flex-col py-6 bg-white transition-all duration-300">
      {/* 🚀 MAIN MENU */}
      <div className="px-3 space-y-2 flex-1">
        {/* Home Button */}
        {icons.map((state, i) => (
          <button
            key={i}
            onClick={() => navigate(state.link)}
            className={`cursor-pointer flex items-center rounded-xl transition-all duration-200 group w-full py-3
            ${isCollapsed ? "justify-center px-0" : "gap-6 px-4"} 
            ${pathname === state.link ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"}`}
          >
            {state.icon}
            {!isCollapsed && (
              <span className="text-sm font-bold tracking-tight">{state.name}</span>
            )}
          </button>
        ))}
      </div>

      {/* 🚪 LOGOUT SECTION */}
      <div className="mt-auto px-3 pt-4 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className={`cursor-pointer flex items-center w-full py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200
            ${isCollapsed ? "justify-center px-0" : "gap-6 px-4"}`}
        >
          <svg
            className="w-5 h-5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7"
            />
          </svg>
          {!isCollapsed && (
            <span className="text-xs font-black uppercase tracking-widest">
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
