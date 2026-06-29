import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ====================
// Public
// ====================

export const getDoctors = async () => {
  const { data } = await axios.get(`${API_URL}/api/doctors`);

  return data.doctors;
};

export const getDoctorById = async (id) => {
  const { data } = await axios.get(`${API_URL}/api/doctors/${id}`);

  return data.doctor;
};

export const getDoctorByEmail = async (email) => {
  const { data } = await axios.get(`${API_URL}/api/doctors/email/${email}`);

  return data.doctor;
};

// ====================
// Doctor Dashboard
// ====================

export const updateDoctorSchedule = async (id, scheduleData) => {
  const { data } = await axios.patch(
    `${API_URL}/api/doctors/${id}/schedule`,
    scheduleData,
  );

  return data;
};

export const updateDoctorProfile = async (id, profileData) => {
  const { data } = await axios.patch(
    `${API_URL}/api/doctors/${id}/profile`,
    profileData,
  );

  return data;
};

// ====================
// Admin
// ====================

export const getAllDoctors = async () => {
  const { data } = await axios.get(`${API_URL}/api/doctors/admin/all`);

  return data.doctors;
};

export const addDoctor = async (doctorData) => {
  const { data } = await axios.post(`${API_URL}/api/doctors`, doctorData);

  return data;
};

export const deleteDoctor = async (id) => {
  const { data } = await axios.delete(`${API_URL}/api/doctors/${id}`);

  return data;
};
