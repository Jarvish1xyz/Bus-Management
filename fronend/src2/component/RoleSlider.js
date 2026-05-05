export default function RoleSlider({ role, setRole }) {
  return (
    <div className="flex bg-white/30 rounded-lg p-1 mb-4">
      {["admin", "driver", "student"].map((r) => (
        <button
          key={r}
          onClick={() => setRole(r)}
          className={`flex-1 py-2 rounded ${
            role === r ? "bg-blue-500 text-white" : ""
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  );
}