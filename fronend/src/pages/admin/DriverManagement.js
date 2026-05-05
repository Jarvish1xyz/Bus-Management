import React, { useEffect, useState } from "react";
import DriverList from "../../components/admin/DriverList";
import API from "../../api";
import { useNotice } from "../../NoticeContext";

const DriverManagement = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const [drivers, setDrivers] = useState([]);
    const { triggerNotice } = useNotice();

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            const res = await API.post("/api/driver/all", {
                university: user.university,
            });
            setDrivers(res.data);
        } catch {
            triggerNotice("Failed to fetch drivers", "error");
        }
    };

    const handleAddDriver = async (data) => {
        try {
            await API.post("/api/driver/", {
                data,
                university: user.university,
            });
            triggerNotice("Driver added", "success");
            fetchDrivers();
        } catch(err) {
            console.log(err.message);
            triggerNotice("Error adding driver", "error");
        }
    };

    const handleDeleteDriver = async (id) => {
        try {
            await API.delete(`/api/driver/${id}`);
            triggerNotice("Driver deleted", "success");
            fetchDrivers();
        } catch {
            triggerNotice("Error deleting driver", "error");
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <DriverList
                drivers={drivers}
                onDelete={handleDeleteDriver}
                onAdd={handleAddDriver}
            />
        </div>
    );
};

export default DriverManagement;