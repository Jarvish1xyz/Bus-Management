import React, { useEffect, useState } from "react";
import BusList from "../../components/admin/BusList";
import API from "../../api";
import { useNotice } from "../../NoticeContext";

const BusManagement = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const [buses, setBuses] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [places, setPlaces] = useState([]);

    const { triggerNotice } = useNotice();

    useEffect(() => {
        fetchBuses();
        fetchDrivers();
        fetchPlaces();
    }, []);

    const fetchBuses = async () => {
        try {
            const res = await API.post("/api/bus/all", {
                university: user.university,
            });
            setBuses(res.data);
        } catch {
            triggerNotice("Failed to fetch buses", "error");
        }
    };

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

    const handleAddBus = async (busData) => {
        try {
            await API.post("/api/bus", {
                ...busData,
                university: user.university,
            });

            triggerNotice("Bus added", "success");
            fetchBuses();
        } catch {
            triggerNotice("Error adding bus", "error");
        }
    };

    const handleDeleteBus = async (id) => {
        try {
            await API.delete(`/api/bus/${id}`);
            triggerNotice("Bus deleted", "success");
            fetchBuses();
        } catch {
            triggerNotice("Error deleting bus", "error");
        }
    };

    return (
        <BusList
            buses={buses}
            drivers={drivers}
            places={places}
            onDelete={handleDeleteBus}
            onAdd={handleAddBus}
        />
    );
};

export default BusManagement;