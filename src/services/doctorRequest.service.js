import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

// Submit doctor application
export const createDoctorRequest = async (
  requestData
) => {
  const { data } = await axios.post(
    `${API_URL}/api/doctor-requests`,
    requestData
  );

  return data;
};

// Get current user's application
export const getDoctorRequestByEmail = async (
  email
) => {
  const { data } = await axios.get(
    `${API_URL}/api/doctor-requests/email/${email}`
  );

  return data.request;
};

// Get all doctor applications (Admin)
export const getAllDoctorRequests =
  async () => {
    const { data } = await axios.get(
      `${API_URL}/api/doctor-requests`
    );

    return data.requests;
  };

// Approve doctor application
export const approveDoctorRequest =
  async (id) => {
    const { data } = await axios.patch(
      `${API_URL}/api/doctor-requests/${id}/approve`
    );

    return data;
  };

// Reject doctor application
export const rejectDoctorRequest =
  async (id) => {
    const { data } = await axios.patch(
      `${API_URL}/api/doctor-requests/${id}/reject`
    );

    return data;
  };