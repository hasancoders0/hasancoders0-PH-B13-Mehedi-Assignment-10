import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Create Review
export const createReview = async (reviewData) => {
  const { data } = await axios.post(`${API_URL}/api/reviews`, reviewData);

  return data;
};

// Get Review By Appointment
export const getReviewByAppointment = async (appointmentId) => {
  const { data } = await axios.get(
    `${API_URL}/api/reviews/appointment/${appointmentId}`,
  );

  return data.review;
};

// Get Doctor Reviews
export const getDoctorReviews = async (doctorId) => {
  const { data } = await axios.get(`${API_URL}/api/reviews/doctor/${doctorId}`);

  return {
    reviews: data.reviews,
    totalReviews: data.totalReviews,
    averageRating: data.averageRating,
  };
};

// Get Patient Reviews
export const getPatientReviews = async (email) => {
  const { data } = await axios.get(`${API_URL}/api/reviews/patient/${email}`);

  return data.reviews;
};

// Update Review
export const updateReview = async (id, reviewData) => {
  const { data } = await axios.put(`${API_URL}/api/reviews/${id}`, reviewData);

  return data;
};

// Delete Review
export const deleteReview = async (id) => {
  const { data } = await axios.delete(`${API_URL}/api/reviews/${id}`);

  return data;
};

// Get Review By ID
export const getReviewById = async (id) => {
  const { data } = await axios.get(`${API_URL}/api/reviews/${id}`);

  return data.review;
};
