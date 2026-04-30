import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";

const AddBus = () => {
  const [form, setForm] = useState({
    busNo: "",
    numberPlate: "",
    shift: "First",
    lastServiced: "",
    routes: [],
  });

  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Fetch drivers of same university
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await axios.get("/api/driver/all");
        const uniDrivers = res.data.filter(
          (d) => d.university._id === user.university
        );
        setDrivers(uniDrivers);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDrivers();
  }, []);

  // ✅ Filter drivers based on search input
  useEffect(() => {
    if (search === "") {
      setFilteredDrivers([]);
      return;
    }

    const filtered = drivers.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredDrivers(filtered);
  }, [search, drivers]);

  const handleSelectDriver = (driver) => {
    setSelectedDriver(driver);
    setSearch(driver.name);
    setFilteredDrivers([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDriver) {
      return alert("Please select a driver");
    }

    try {
      await axios.post("/api/bus", {
        ...form,
        driver: selectedDriver._id,
        university: user.university,
      });

      alert("Bus Added Successfully");

      setForm({
        busNo: "",
        numberPlate: "",
        shift: "First",
        lastServiced: "",
        routes: [],
      });

      setSearch("");
      setSelectedDriver(null);

    } catch (err) {
      console.error(err);
      alert("Error adding bus");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Bus</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Bus Number"
          value={form.busNo}
          onChange={(e) => setForm({ ...form, busNo: e.target.value })}
        />

        <input
          className="form-control mb-2"
          placeholder="Number Plate"
          value={form.numberPlate}
          onChange={(e) => setForm({ ...form, numberPlate: e.target.value })}
        />

        {/* 🔥 Driver Search Input */}
        <div className="position-relative">
          <input
            className="form-control mb-2"
            placeholder="Search Driver"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedDriver(null);
            }}
          />

          {/* 🔥 Dropdown Suggestions */}
          {filteredDrivers.length > 0 && (
            <div
              className="list-group position-absolute w-100"
              style={{ zIndex: 10 }}
            >
              {filteredDrivers.map((d) => (
                <button
                  type="button"
                  key={d._id}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSelectDriver(d)}
                >
                  {d.name} ({d.email})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected Driver Display */}
        {selectedDriver && (
          <div className="mb-2 text-success">
            Selected: {selectedDriver.name}
          </div>
        )}

        <select
          className="form-control mb-2"
          value={form.shift}
          onChange={(e) => setForm({ ...form, shift: e.target.value })}
        >
          <option>First</option>
          <option>Second</option>
          <option>Both</option>
        </select>

        <input
          type="date"
          className="form-control mb-2"
          value={form.lastServiced}
          onChange={(e) =>
            setForm({ ...form, lastServiced: e.target.value })
          }
        />

        <button className="btn btn-primary">Add Bus</button>
      </form>
    </div>
  );
};

export default AddBus;