import axios from "axios";

const API_URL = "http://localhost:5000";

export const saveUserToDB = async (user) => {
  const userInfo = {
    displayName: user.displayName || "Unknown User",
    email: user.email,
  };

  await axios.post(`${API_URL}/api/users`, userInfo);
};

export const getJWTToken = async (email) => {
  const response = await axios.post(`${API_URL}/api/auth/jwt`, { email });

  return response.data.token;
};
