import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

// Create Review
export const createReview = async (reviewData) => {
  const { data } = await axios.post(
    `${API_URL}/api/review`,
    reviewData
  );

  return data;
};

// Get Doctor Reviews
export const getDoctorReviews = async (
  doctorId
) => {
  const { data } = await axios.get(
    `${API_URL}/api/review/doctor/${doctorId}`
  );

  return data;
};

// Get Patient Reviews
export const getPatientReviews = async (
  email
) => {
  const { data } = await axios.get(
    `${API_URL}/api/review/patient/${email}`
  );

  return data.reviews;
};

// Update Review
export const updateReview = async (
  id,
  reviewData
) => {
  const { data } = await axios.put(
    `${API_URL}/api/review/${id}`,
    reviewData
  );

  return data;
};

// Delete Review
export const deleteReview = async (
  id
) => {
  const { data } = await axios.delete(
    `${API_URL}/api/review/${id}`
  );

  return data;
};