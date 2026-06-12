import React, { useEffect, useState } from "react";
import StudentList from "../../components/admin/StudentList";
import API from "../../api";
import { useNotice } from "../../NoticeContext";

const StudentManagement = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const [students, setStudents] = useState([]);
    const [places, setPlaces] = useState([]);

    const { triggerNotice } = useNotice();


    const fetchStudents = async () => {
        try {
            const res = await API.post("/api/student/all", {
                university: user.university,
            });
            setStudents(res.data);
        } catch {
            triggerNotice("Failed to fetch students", "error");
        }
    };

    const fetchPlaces = async () => {
        try {
            const res = await API.post("/api/place/all", {
                university: user.university,
            });
            setPlaces(res.data);
        } catch {
            triggerNotice("Failed to fetch places", "error");
        }
    };

    useEffect(() => {
        fetchStudents();
        fetchPlaces();
    },);

    const handleAddStudent = async (data) => {
        try {
            await API.post("/api/student/", {
                data,
                university: user.university,
            });

            triggerNotice("Student added", "success");
            fetchStudents();
        } catch (err) {
            triggerNotice(err.response?.data?.msg || "Error adding student", "error");
        }
    };

    const handleDeleteStudent = async (id) => {
        try {
            await API.delete(`/api/student/${id}`);
            triggerNotice("Student deleted", "success");
            fetchStudents();
        } catch {
            triggerNotice("Error deleting student", "error");
        }
    };

    return (
        <StudentList
            students={students}
            onDelete={handleDeleteStudent}
            onAdd={handleAddStudent}
            places={places}
        />
    );
};

export default StudentManagement;