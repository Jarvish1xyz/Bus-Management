import { useState } from "react";
import AddPlace from "./admin/AddPlace";
import AddDriver from "./admin/AddDriver";
import AddBus from "./admin/AddBus";
import AddStudent from "./admin/AddStudent";

export default function Dashboard() {
  const [tab, setTab] = useState("place");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex gap-4 mb-6">
        {["place","driver","bus","student"].map(t => (
          <button key={t}
            onClick={()=>setTab(t)}
            className="bg-blue-500 text-white px-4 py-2 rounded">
            {t}
          </button>
        ))}
      </div>

      {tab==="place" && <AddPlace/>}
      {tab==="driver" && <AddDriver/>}
      {tab==="bus" && <AddBus/>}
      {tab==="student" && <AddStudent/>}
    </div>
  );
}