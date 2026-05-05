import React, { useState } from "react";
import { GraduationCap, Plus, Trash2 } from "lucide-react";
import AddStudentModal from "./AddStudentModal";

const StudentList = ({ students, onDelete, onAdd, places }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 min-h-screen bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-2">
            <GraduationCap className="text-blue-600" />
            Student Management
          </h1>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Student
          </button>
        </div>

        {/* LIST */}
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {students.map((s, i) => (
            <div
              key={s._id || i}
              className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                  <GraduationCap size={18} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    {s.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {s.email}
                  </p>
                  <p className="text-xs text-slate-400">
                    Pickup: {s.pickupPoint?.name || "N/A"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onDelete(s._id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <AddStudentModal
            onClose={() => setIsModalOpen(false)}
            onAdd={(data) => {
              onAdd(data);
              setIsModalOpen(false);
            }}
            places={places}
          />
        )}
      </div>
    </div>
  );
};

export default StudentList;