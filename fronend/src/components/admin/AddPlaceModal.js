import React, { useState } from 'react';
import { X, Plus, MapPin, Save } from 'lucide-react';

const AddPlaceModal = ({ onClose, onAdd }) => {
  const [inputs, setInputs] = useState(['']);

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const addField = () => setInputs([...inputs, '']);
  
  const removeField = (index) => {
    if (inputs.length > 1) {
      setInputs(inputs.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in duration-300">
        
        {/* Modal Header */}
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-2xl font-black text-slate-800">Add Route Stops</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
            <X size={24} />
          </button>
        </div>

        {/* Dynamic Form Area */}
        <div className="p-8 max-h-[400px] overflow-y-auto space-y-4">
          {inputs.map((input, index) => (
            <div key={index} className="flex gap-3 animate-in slide-in-from-left-4 duration-200">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  value={input}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder={`Stop #${index + 1} name`}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-semibold"
                />
              </div>
              {inputs.length > 1 && (
                <button 
                  onClick={() => removeField(index)}
                  className="p-4 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          ))}

          <button 
            onClick={addField}
            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold flex items-center justify-center gap-2 hover:border-blue-400 hover:text-blue-500 transition-all"
          >
            <Plus size={20} />
            Add Another Stop
          </button>
        </div>

        {/* Modal Footer */}
        <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-4 font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => onAdd(inputs)}
            className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Save Route
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPlaceModal;