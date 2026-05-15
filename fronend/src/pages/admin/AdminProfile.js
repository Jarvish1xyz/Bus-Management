import React, { useState, useEffect, useCallback } from "react";
import ProfileCard from "../../components/pages/ProfileCard";
import API from "../../api";

const AdminProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [university, setUniversity] = useState({});
  const uniId = user?.university;

  const fetchUni = useCallback(async () => {
    try {
      const res = await API.get(`/api/university/${uniId}`);
      setUniversity(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [uniId]);

  useEffect(() => {
    fetchUni();
  }, [fetchUni]);

  return <ProfileCard user={user} university={university} />;
};

export default AdminProfile;