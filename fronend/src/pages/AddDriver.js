import React, { useState } from "react";
import api from "../api/axiosConfig";

const AddDriver = () => {
  const [form, setForm] = useState({
    name: "",
    Salary: "",
    shift: "First",
    address: "",
    email: "",
    phone: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await api.post("/api/driver", {
        ...form,
        university: user.university
      });

      alert("Driver Added");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="p-10">
      <h2>Add Driver</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="block w-full p-3 bg-white/10 rounded"
          />
        ))}
        <button className="bg-blue-600 px-6 py-2 rounded">Add</button>
      </form>
    </div>
  );
};

export default AddDriver;