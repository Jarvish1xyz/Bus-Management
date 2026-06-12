import { useEffect, useState } from "react";
// import Sidebar from "./Sidebar";
// import './Navbar.css';

function Navbar({ onLineClick }) {
  const [islogo, setIslogo] = useState(false);

  const change = () => {
    setIslogo(!islogo);
    onLineClick();
  };

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === "Escape") change(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  },);

  return (
    <nav className="fixed top-0 w-full h-11 bg-white border-b border-slate-200 flex items-center px-4 z-50">
      <div className="flex items-center gap-4">
        <div onClick={change} className="cursor-pointer space-y-1.5 p-2 hover:bg-slate-100 rounded-lg transition-all">
          <div className={`h-0.5 w-5 bg-blue-600 rounded-full transition-all ${islogo ? "rotate-45 translate-y-2" : ""}`}></div>
          <div className={`h-0.5 w-5 bg-blue-600 rounded-full transition-all ${islogo ? "opacity-0" : ""}`}></div>
          <div className={`h-0.5 w-5 bg-blue-600 rounded-full transition-all ${islogo ? "-rotate-45 -translate-y-2" : ""}`}></div>
        </div>

        {/* Logo Section */}
        <div className="flex items-center gap-3 select-none">
          <div className="flex items-center justify-center transition-transform hover:scale-110 duration-200">
            <svg width="26" height="26" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M40 40L128 92L216 40V190L184 210V95L128 128L72 95V210L40 190V40Z"
                fill="#2563EB"
              />
              <rect
                x="78"
                y="92"
                width="100"
                height="82"
                rx="18"
                fill="#0F172A"
              />

              <rect
                x="90"
                y="104"
                width="76"
                height="42"
                rx="8"
                fill="#2563EB"
              />

              <rect
                x="94"
                y="152"
                width="16"
                height="8"
                rx="4"
                fill="white"
              />
              <rect
                x="146"
                y="152"
                width="16"
                height="8"
                rx="4"
                fill="white"
              />

              <rect
                x="112"
                y="154"
                width="32"
                height="4"
                rx="2"
                fill="white"
              />
              <rect
                x="116"
                y="164"
                width="24"
                height="4"
                rx="2"
                fill="white"
              />

              <rect
                x="68"
                y="116"
                width="8"
                height="24"
                rx="4"
                fill="#0F172A"
              />
              <rect
                x="180"
                y="116"
                width="8"
                height="24"
                rx="4"
                fill="#0F172A"
              />

              <rect
                x="94"
                y="174"
                width="18"
                height="20"
                rx="4"
                fill="#0F172A"
              />
              <rect
                x="144"
                y="174"
                width="18"
                height="20"
                rx="4"
                fill="#0F172A"
              />
            </svg>
          </div>

          <span className="text-xl font-black text-slate-800 tracking-tight flex items-center">
            Bus <span className="text-blue-600"> Management</span>
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;