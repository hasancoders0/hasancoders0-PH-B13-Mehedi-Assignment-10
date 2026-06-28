import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getDashboardStats = async () => {
  const { data } = await axios.get(`${API_URL}/api/admin/dashboard-stats`);

  return data.stats;
};
