import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getDashboardStats = async () => {
  const { data } = await axios.get(`${API_URL}/api/admin/dashboard-stats`);

  return data.stats;
};

export const getAllUsers = async () => {
  const { data } = await axios.get(`${API_URL}/api/admin/users`);

  return data.users;
};

export const suspendUser = async (id) => {
  const { data } = await axios.patch(
    `${API_URL}/api/admin/users/${id}/suspend`,
  );

  return data;
};

export const activateUser = async (id) => {
  const { data } = await axios.patch(
    `${API_URL}/api/admin/users/${id}/activate`,
  );

  return data;
};

export const deleteUser = async (id) => {
  const { data } = await axios.delete(`${API_URL}/api/admin/users/${id}`);

  return data;
};
