import React, { useState } from "react";
import api from "../api/axiosConfig";

const AddPlace = () => {
  const [names, setNames] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await api.post("/api/place", {
        names: names.split(",").map(n => n.trim()),
        university: user.university
      });

      alert("Places Added");
      setNames("");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl mb-5">Add Places</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter places (comma separated)"
          value={names}
          onChange={(e) => setNames(e.target.value)}
          className="w-full p-3 bg-white/10 rounded"
        />
        <button className="bg-blue-600 px-6 py-2 rounded">Add</button>
      </form>
    </div>
  );
};

export default AddPlace;