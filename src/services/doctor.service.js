import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getDoctors = async () => {
  const { data } = await axios.get(`${API_URL}/api/doctors`);

  return data.doctors;
};

export const getDoctorById = async (id) => {
  const { data } = await axios.get(`${API_URL}/api/doctors/${id}`);

  return data.doctor;
};
