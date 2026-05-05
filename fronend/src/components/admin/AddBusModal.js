import React, { useState } from "react";
import { X, Bus, Save, ChevronDown, Clock, MapPin } from "lucide-react";

const AddBusModal = ({ onClose, onAdd, drivers = [], places = [] }) => {
  const [form, setForm] = useState({
    busNo: "",
    numberPlate: "",
    driverId: "",
    shift: "First",
    lastServiced: "",
    routes: {
      first: { startTime: "", points: [] },
      second: { startTime: "", points: [] },
    },
  });

  const [openDropdown, setOpenDropdown] = useState(null);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleRouteChange = (shiftKey, field, value) => {
    setForm({
      ...form,
      routes: {
        ...form.routes,
        [shiftKey]: {
          ...form.routes[shiftKey],
          [field]: value,
        },
      },
    });
  };

  const togglePlace = (shiftKey, placeName) => {
    const current = form.routes[shiftKey].points;

    const updated = current.includes(placeName)
      ? current.filter((p) => p !== placeName)
      : [...current, placeName];

    handleRouteChange(shiftKey, "points", updated);
  };

  const handleSubmit = () => {
    let routes = [];

    if (form.shift === "First" || form.shift === "Both") {
      routes.push({
        startTime: form.routes.first.startTime,
        points: form.routes.first.points,
      });
    }

    if (form.shift === "Second" || form.shift === "Both") {
      routes.push({
        startTime: form.routes.second.startTime,
        points: form.routes.second.points,
      });
    }

    onAdd({
      busNo: form.busNo,
      numberPlate: form.numberPlate,
      driverId: form.driverId,
      shift: form.shift,
      lastServiced: form.lastServiced,
      routes,
    });
  };

  // ---------- CUSTOM DROPDOWN ----------
  const Dropdown = ({ label, value, options, onSelect, id }) => (
    <div className="relative">
      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
        {label}
      </label>

      <button
        onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
        className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-semibold text-slate-700"
      >
        {value || label}
        <ChevronDown size={18} />
      </button>

      {openDropdown === id && (
        <div className="absolute z-20 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-lg overflow-hidden">
          {options.map((opt, i) => (
            <div
              key={i}
              onClick={() => {
                onSelect(opt);
                setOpenDropdown(null);
              }}
              className="px-5 py-3 hover:bg-blue-50 cursor-pointer text-sm font-semibold text-slate-700"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ---------- ROUTE SECTION ----------
  const RouteSection = ({ title, shiftKey }) => (
    <div className="col-span-2 space-y-4 border border-slate-100 p-5 rounded-2xl">
      <h3 className="font-bold text-slate-700 flex items-center gap-2">
        <Clock size={18} /> {title}
      </h3>

      <div className="grid grid-cols-2 gap-4">

        {/* TIME */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            Start Time
          </label>
          <input
            type="time"
            value={form.routes[shiftKey].startTime}
            onChange={(e) =>
              handleRouteChange(shiftKey, "startTime", e.target.value)
            }
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl"
          />
        </div>

        {/* EMPTY SPACE FOR ALIGNMENT */}
        <div></div>

        {/* PLACES */}
        <div className="col-span-2">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            Select Route Places
          </label>

          <div className="flex flex-wrap gap-2">
            {places.map((p) => (
              <button
                key={p._id}
                onClick={() => togglePlace(shiftKey, p.name)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold border transition ${
                  form.routes[shiftKey].points.includes(p.name)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-slate-50 text-slate-600 border-slate-200"
                }`}
              >
                <MapPin size={14} className="inline mr-1" />
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl h-[90vh] flex flex-col rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in duration-300">

        {/* HEADER */}
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Bus className="text-blue-600" />
            Add Bus
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-8 grid grid-cols-2 gap-6 overflow-y-auto flex-1">

          {/* BUS NO */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Bus Number
            </label>
            <input
              value={form.busNo}
              onChange={(e) => handleChange("busNo", e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl"
            />
          </div>

          {/* NUMBER PLATE */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Number Plate
            </label>
            <input
              value={form.numberPlate}
              onChange={(e) => handleChange("numberPlate", e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl"
            />
          </div>

          {/* DRIVER */}
          <Dropdown
            id="driver"
            label="Driver"
            value={drivers.find((d) => d._id === form.driverId)?.name}
            options={drivers.map((d) => ({
              label: d.name,
              value: d._id,
            }))}
            onSelect={(opt) => handleChange("driverId", opt.value)}
          />

          {/* SHIFT */}
          <Dropdown
            id="shift"
            label="Shift"
            value={form.shift}
            options={[
              { label: "First", value: "First" },
              { label: "Second", value: "Second" },
              { label: "Both", value: "Both" },
            ]}
            onSelect={(opt) => handleChange("shift", opt.value)}
          />

          {/* ROUTES */}
          {(form.shift === "First" || form.shift === "Both") && (
            <RouteSection title="First Shift Route" shiftKey="first" />
          )}

          {(form.shift === "Second" || form.shift === "Both") && (
            <RouteSection title="Second Shift Route" shiftKey="second" />
          )}

          {/* LAST SERVICED */}
          <div className="col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Last Serviced Date
            </label>
            <input
              type="date"
              value={form.lastServiced}
              onChange={(e) => handleChange("lastServiced", e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-4 font-bold text-slate-500 hover:text-slate-800"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Save Bus
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBusModal;