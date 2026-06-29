import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Create Prescription
export const createPrescription = async (prescriptionData) => {
  const { data } = await axios.post(
    `${API_URL}/api/prescriptions`,
    prescriptionData,
  );

  return data;
};

// Doctor Prescriptions
export const getDoctorPrescriptions = async (email) => {
  const { data } = await axios.get(
    `${API_URL}/api/prescriptions/doctor/${email}`,
  );

  return data.prescriptions;
};

// Patient Prescriptions
export const getPatientPrescriptions = async (email) => {
  const { data } = await axios.get(
    `${API_URL}/api/prescriptions/patient/${email}`,
  );

  return data.prescriptions;
};

// Single Prescription
export const getPrescriptionById = async (id) => {
  const { data } = await axios.get(`${API_URL}/api/prescriptions/${id}`);

  return data.prescription;
};

// Update Prescription
export const updatePrescription = async (id, updateData) => {
  const { data } = await axios.put(
    `${API_URL}/api/prescriptions/${id}`,
    updateData,
  );

  return data;
};
