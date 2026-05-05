import React, { useState, useEffect } from 'react';
import PlaceList from '../../components/admin/PlaceList';
import API from '../../api';
import { useNotice } from '../../NoticeContext';

const PlaceManagement = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [places, setPlaces] = useState([]);
  const { triggerNotice } = useNotice();

  // 1. Load places from Backend on mount
  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      console.log(user.university);
      const res = await API.post('/api/place/all', {
        university: user.university,
      });
      setPlaces(res.data);
    } catch (err) {
      console.error("Failed to fetch places");
    }
  };

  // 2. Handle Adding New Places (from the Modal)
  const handleAddPlaces = async (newPlaceNames) => {
    try {
      // Filter out empty strings
      const filteredNames = newPlaceNames.filter(name => name.trim() !== "");
      
      // Call API for each or a bulk endpoint if you have one
      await API.post('/api/place/', { names: filteredNames, university: user.university });
      
      triggerNotice("Route updated successfully!", "success");
      fetchPlaces(); // Refresh list
    } catch (err) {
      triggerNotice("Failed to add places", "error");
    }
  };
  
  // 3. Handle Deletion
  const handleDeletePlace = async (id) => {
    try {
      await API.delete(`/api/place/${id}`);
      setPlaces(places.filter(p => p.id !== id));
      triggerNotice("Place removed", "success");
      fetchPlaces(); // Refresh list
    } catch (err) {
      triggerNotice("Error deleting place", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* You can add a Sidebar or Navbar component here */}
      <PlaceList 
        places={places} 
        onDelete={handleDeletePlace} 
        onSaveBatch={handleAddPlaces} 
      />
    </div>
  );
};

export default PlaceManagement;