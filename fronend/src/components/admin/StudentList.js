import React, { useState } from "react";
import { GraduationCap, Plus, Trash2, ChevronLeft } from "lucide-react";
import AddStudentModal from "./AddStudentModal";
import StudentModal from "./StudentModal";
import { useNavigate } from "react-router-dom";

const StudentList = ({ students, onDelete, onAdd, places }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStudentModal, setIsStudentModal] = useState(false);
  const [idOfStudent, setIdOfStudent] = useState("");

  const handleStudentModal = (studentId) => {
    setIdOfStudent(studentId);
    setIsStudentModal(true);
  };

  const navigate = useNavigate();

  return (
    <div className="p-3 min-h-screen bg-[#f8fafc]">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors group"
      >
        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Go Back
      </button>
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
              <GraduationCap className="text-blue-600" size={32} />
              Student Management
            </h1>
            <p className="text-slate-500 font-medium">Define and organize Students</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
          >
            <Plus size={20} />
            Add Student
          </button>
        </div>

        {/* LIST */}
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {students.map((s, i) => (
            <div
              key={s._id || i}
              className="flex items-center cursor-pointer justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition"
              onClick={() => handleStudentModal(s._id)}
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

        {isStudentModal && (
          <StudentModal
            studentId={idOfStudent}
            onClose={() => setIsStudentModal(false)}
            places={places}
          />
        )}
      </div>
    </div>
  );
};

export default StudentList;