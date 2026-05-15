import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  ShieldCheck,
  Pencil,
  Save,
  X,
} from "lucide-react";
import API from "../../api";
import { useNotice } from "../../NoticeContext";

const ProfileCard = ({ user, university }) => {
  const { triggerNotice, triggerConfirm } = useNotice();

  const [isEdit, setIsEdit] = useState(false);
  // Update for Admin to update university detail
  const [form, setForm] = useState({});

  useEffect(() => {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      uniName: university?.name || "",
      uniEmail: university?.email || "",
      uniPhone: university?.phone || "",
    });
  }, [user, university]);

  if (!user) return null;

  const handleChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleSave = async () => {
    triggerConfirm(
      "Are you sure you want to update profile?",
      async () => {
        try {
          if (user.role === "admin") {
            await API.patch(`/api/university/${user.university}`, form);
          }
          await API.patch(`/api/${user.role}/profile/${user.id}`, form);

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...user,
              name: form.name,
              email: form.email,
              universityName: form.uniName,
            })
          );

          triggerNotice("Profile updated successfully", "success");

          setIsEdit(false);

          window.location.reload();
        } catch (err) {
          triggerNotice(
            err.response?.data?.msg || "Failed to update profile",
            "error"
          );
        }
      },
      "primary"
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 p-10 shadow-2xl">

          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div className="flex flex-col md:flex-row md:items-center gap-6">

              {/* AVATAR */}
              <div className="w-28 h-28 rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                <User size={50} />
              </div>

              {/* USER INFO */}
              <div className="text-white">
                <p className="uppercase tracking-[0.3em] text-blue-100 font-bold text-xs">
                  {user.role} Profile
                </p>

                {isEdit ? (
                  <input
                    value={form.name}
                    onChange={(e) =>
                      handleChange("name", e.target.value)
                    }
                    className="mt-2 bg-white/20 border border-white/20 rounded-2xl px-4 py-3 text-3xl font-black outline-none w-full"
                  />
                ) : (
                  <h1 className="text-4xl font-black mt-2">
                    {user.name}
                  </h1>
                )}

                <div className="mt-5 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl">
                  <ShieldCheck size={18} />
                  <span className="font-bold">
                    Active {user.role}
                  </span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-3">

              {!isEdit ? (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-5 cursor-pointer py-3 rounded-2xl bg-white text-slate-800 font-bold flex items-center gap-2 hover:scale-105 transition-all"
                >
                  <Pencil size={18} />
                  Edit
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="px-5 cursor-pointer py-3 rounded-2xl bg-emerald-500 text-white font-bold flex items-center gap-2 hover:scale-105 transition-all"
                  >
                    <Save size={18} />
                    Save
                  </button>

                  <button
                    onClick={() => {
                      setForm({
                        name: user?.name || "",
                        email: user?.email || "",
                        phone: user?.phone || "",
                      });

                      setIsEdit(false);
                    }}
                    className="px-5 cursor-pointer py-3 rounded-2xl bg-red-500 text-white font-bold flex items-center gap-2 hover:scale-105 transition-all"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </>
              )}

            </div>

          </div>
        </div>

        {/* BODY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

          {/* PERSONAL INFO */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <User size={22} />
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-800">
                  Personal Information
                </h2>

                <p className="text-sm text-slate-500">
                  User profile details
                </p>
              </div>
            </div>

            <div className="space-y-4">

              <div className="bg-slate-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <span className="text-xs uppercase font-bold">
                    {user.role} ID
                  </span>
                </div>

                <p className="font-bold text-slate-800">
                  {user.id}
                </p>
              </div>

              {/* NAME */}
              <div className="bg-slate-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <User size={16} />
                  <span className="text-xs uppercase font-bold">
                    Full Name
                  </span>
                </div>

                {isEdit ? (
                  <input
                    value={form.name}
                    onChange={(e) =>
                      handleChange("name", e.target.value)
                    }
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold outline-none"
                  />
                ) : (
                  <p className="font-bold text-slate-800">
                    {user.name}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div className="bg-slate-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Mail size={16} />
                  <span className="text-xs uppercase font-bold">
                    Email
                  </span>
                </div>

                {isEdit ? (
                  <input
                    value={form.email}
                    onChange={(e) =>
                      handleChange("email", e.target.value)
                    }
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold outline-none"
                  />
                ) : (
                  <p className="font-bold text-slate-800 break-all">
                    {user.email}
                  </p>
                )}
              </div>

              {/* PHONE */}
              <div className="bg-slate-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Phone size={16} />
                  <span className="text-xs uppercase font-bold">
                    Phone
                  </span>
                </div>

                {isEdit ? (
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      handleChange("phone", e.target.value)
                    }
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold outline-none"
                  />
                ) : (
                  <p className="font-bold text-slate-800">
                    {user.phone || "Not Added"}
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* UNIVERSITY */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <GraduationCap size={22} />
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-800">
                  University Details
                </h2>

                <p className="text-sm text-slate-500">
                  Institution information
                </p>
              </div>
            </div>

            <div className="space-y-4">

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-xs uppercase font-bold text-slate-400 mb-1">
                  University Name
                </p>

                {(user.role === "admin" && isEdit) ? (
                  <input
                    value={form.uniName}
                    onChange={(e) =>
                      handleChange("uniName", e.target.value)
                    }
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold outline-none"
                  />
                ) : (
                  <p className="font-bold text-slate-800">
                    {university?.name || "Not Added"}
                  </p>
                )}
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-xs uppercase font-bold text-slate-400 mb-1">
                  University ID
                </p>

                <p className="font-bold text-slate-800 break-all">
                  {user.university?._id ||
                    user.university ||
                    "N/A"}
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-xs uppercase font-bold text-slate-400 mb-1">
                  University Email
                </p>

                {(user.role === "admin" && isEdit) ? (
                  <input
                    value={form.uniEmail}
                    onChange={(e) =>
                      handleChange("uniEmail", e.target.value)
                    }
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold outline-none"
                  />
                ) : (
                  <p className="font-bold text-slate-800">
                    {university?.email || "Not Added"}
                  </p>
                )}
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-xs uppercase font-bold text-slate-400 mb-1">
                  University Phone
                </p>

                {(user.role === "admin" && isEdit) ? (
                  <input
                    value={form.uniPhone}
                    onChange={(e) =>
                      handleChange("uniPhone", e.target.value)
                    }
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold outline-none"
                  />
                ) : (
                  <p className="font-bold text-slate-800">
                    {university?.phone || "Not Added"}
                  </p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileCard;