import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Create appointment
export const createAppointment = async (appointmentData) => {
  const { data } = await axios.post(
    `${API_URL}/api/appointments`,
    appointmentData,
  );

  return data;
};

// Get appointments by patient email
export const getMyAppointments = async (email) => {
  const { data } = await axios.get(
    `${API_URL}/api/appointments/patient/${email}`,
  );

  return data.appointments;
};

// Get appointmetns by doctor
export const getDoctorAppointments = async (email) => {
  const { data } = await axios.get(
    `${API_URL}/api/appointments/doctor/${email}`,
  );

  return data.appointments;
};

// Cancel appointment
export const cancelAppointment = async (id) => {
  const { data } = await axios.patch(
    `${API_URL}/api/appointments/${id}/cancel`,
  );

  return data;
};

// Get single appointment
export const getAppointmentById = async (id) => {
  const { data } = await axios.get(`${API_URL}/api/appointments/${id}`);

  return data.appointment;
};

// Confirm payment
export const confirmPayment = async (id, transactionId) => {
  const { data } = await axios.patch(`${API_URL}/api/appointments/${id}/pay`, {
    transactionId,
  });

  return data;
};

export const updateAppointmentStatus = async (id, status) => {
  const { data } = await axios.patch(
    `${API_URL}/api/appointments/${id}/status`,
    {
      status,
    },
  );

  return data;
};

export const getAllAppointments = async () => {
  const { data } = await axios.get(`${API_URL}/api/appointments/admin/all`);

  return data.appointments;
};

export const rescheduleAppointment = async (id, scheduleData) => {
  const { data } = await axios.patch(
    `${API_URL}/api/appointments/${id}/reschedule`,
    scheduleData,
  );

  return data;
};
