import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

console.log("AUTH API URL:", API_URL);

export const saveUserToDB = async (user) => {
  const userInfo = {
    displayName: user.displayName || "Unknown User",
    email: user.email,
  };

  console.log("Saving user to:", `${API_URL}/api/users`);

  await axios.post(`${API_URL}/api/users`, userInfo);
};

export const getJWTToken = async (email) => {
  console.log("Getting JWT from:", `${API_URL}/api/auth/jwt`);

  const { data } = await axios.post(`${API_URL}/api/auth/jwt`, { email });

  console.log("JWT response:", data);

  return data.token;
};
