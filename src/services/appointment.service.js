import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

// Create appointment
export const createAppointment = async (
  appointmentData
) => {
  const { data } = await axios.post(
    `${API_URL}/api/appointments`,
    appointmentData
  );

  return data;
};

// Get appointments by patient email
export const getMyAppointments = async (
  email
) => {
  const { data } = await axios.get(
    `${API_URL}/api/appointments/patient/${email}`
  );

  return data.appointments;
};

// Cancle appointments by patient
export const cancelAppointment = async (
  id
) => {
  const { data } = await axios.patch(
    `${API_URL}/api/appointments/${id}/cancel`
  );

  return data;
};