import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getAllDoctors = async () => {
  const { data } = await axios.get(`${API_URL}/api/doctors/admin/all`);

  return data.doctors;
};

export const addDoctor = async (doctorData) => {
  const { data } = await axios.post(`${API_URL}/api/doctors`, doctorData);

  return data;
};

export const verifyDoctor = async (id) => {
  const { data } = await axios.patch(`${API_URL}/api/doctors/${id}/verify`);

  return data;
};

export const unverifyDoctor = async (id) => {
  const { data } = await axios.patch(`${API_URL}/api/doctors/${id}/unverify`);

  return data;
};

export const deleteDoctor = async (id) => {
  const { data } = await axios.delete(`${API_URL}/api/doctors/${id}`);

  return data;
};
