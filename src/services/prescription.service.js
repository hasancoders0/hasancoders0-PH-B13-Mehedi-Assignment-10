import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export const createPrescription =
  async (prescriptionData) => {
    const { data } = await axios.post(
      `${API_URL}/api/prescriptions`,
      prescriptionData
    );

    return data;
  };

export const getPatientPrescriptions =
  async (email) => {
    const { data } = await axios.get(
      `${API_URL}/api/prescriptions/patient/${email}`
    );

    return data.prescriptions;
  };

export const getPrescriptionById =
  async (id) => {
    const { data } = await axios.get(
      `${API_URL}/api/prescriptions/${id}`
    );

    return data.prescription;
  };